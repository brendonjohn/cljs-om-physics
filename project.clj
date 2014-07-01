(defproject render-p2 "0.1.0"
  :description "demonstrate of om and p2 working hand in hand"
  :url "http://example.com/FIXME"

  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2234"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [om "0.6.4"]]

  :plugins [[lein-cljsbuild "1.0.3"]]

  :source-paths ["src"]

  :cljsbuild {:builds [{:id "render-p2"
                        :source-paths ["src"]
                        :compiler {:output-to "render_p2.js"
                                   :output-dir "out"
                                   :optimizations :none
                                   :source-map true}}]})
