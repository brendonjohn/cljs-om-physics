(ns render-p2.core
  (:require [cljs.core.async :refer [put! chan <! >! alts! timeout] :as async]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:require-macros [cljs.core.async.macros :refer [go alt! go-loop]]))

(enable-console-print!)

;; p2 physics
;; ----------------------------------------------------------------------------

;Setup our world
(def world (js/p2.World. (js-obj "gravity" #js [0 -9.82])))

;Create a circle
(def radius 1)
(def circleShape (js/p2.Circle. radius))
(def circleBody (js/p2.Body. (js-obj "mass" 5 "position" #js [0 10])))
;; circleBody.addShape(circleShape);
(.addShape circleBody circleShape)

;Create a plane
(def groundShape (js/p2.Plane.))
(def groundBody (js/p2.Body. (js-obj "mass" 0)))
;; groundBody.addShape(groundShape);
(.addShape groundBody groundShape)

;Add the bodies to the world
(.addBody world circleBody)
(.addBody world groundBody)

;; application state
;; ----------------------------------------------------------------------------

(def app-state (atom {:player {:physicsx (aget (.-position circleBody) 0)
                               :physicsy (aget (.-position circleBody) 1)}}))


(def physics-step (chan))
(go (while true (<! (timeout 10)) (>! physics-step 1)))


(defn update-player [app-state]
  (let [player-position (.-position circleBody)]
    (assoc-in app-state [:player :physicsx] (aget player-position 0))
    (assoc-in app-state [:player :physicsy] (aget player-position 1))))


(go (while true
      (<! physics-step)
      (.step world (/ 1 60))
      (swap! app-state update-player)))


;; om
;; ----------------------------------------------------------------------------

(defn player-style
  "construct a style string from a js array. e.g position = #js [0, 9.8]"
  [player]
  #js {:position "absolute"
       :bottom (js/Math.round (* 80 (:physicsy player)))
       :left (:physicsx player)})

(defn player-view [player owner]
  (reify
    om/IRender
    (render [_]
            (dom/p #js {:style (player-style player)} "i am player"))))

(defn game-view [state owner]
  (reify
    om/IRender
    (render [_]
            (dom/div nil (om/build player-view (:player state))))))


(om/root game-view app-state
         {:target (. js/document (getElementById "p2-wrapper"))})
