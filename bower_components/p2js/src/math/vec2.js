/**
 * The vec2 object from glMatrix, with some extensions and some removed methods. See http://glmatrix.net for full doc.
 * @class vec2
 */

var vec2 = require('../../build/vec2').vec2;

/**
 * Make a cross product and only return the z component
 * @method crossLength
 * @static
 * @param  {Float32Array} a
 * @param  {Float32Array} b
 * @return {Number}
 */
vec2.crossLength = function(a,b){
    return a[0] * b[1] - a[1] * b[0];
};

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossVZ
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} vec
 * @param  {Number} zcomp
 * @return {Number}
 */
vec2.crossVZ = function(out, vec, zcomp){
    vec2.rotate(out,vec,-Math.PI/2);// Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
};

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossZV
 * @static
 * @param  {Float32Array} out
 * @param  {Number} zcomp
 * @param  {Float32Array} vec
 * @return {Number}
 */
vec2.crossZV = function(out, zcomp, vec){
    vec2.rotate(out,vec,Math.PI/2); // Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
};

/**
 * Rotate a vector by an angle
 * @method rotate
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} a
 * @param  {Number} angle
 */
vec2.rotate = function(out,a,angle){
    var c = Math.cos(angle),
        s = Math.sin(angle),
        x = a[0],
        y = a[1];
    out[0] = c*x -s*y;
    out[1] = s*x +c*y;
};

/**
 * Transform a point position to local frame.
 * @method toLocalFrame
 * @param  {Array} out
 * @param  {Array} worldPoint
 * @param  {Array} framePosition
 * @param  {Number} frameAngle
 */
vec2.toLocalFrame = function(out, worldPoint, framePosition, frameAngle){
    vec2.copy(out, worldPoint);
    vec2.sub(out, out, framePosition);
    vec2.rotate(out, out, -frameAngle);
};

/**
 * Transform a point position to global frame.
 * @method toGlobalFrame
 * @param  {Array} out
 * @param  {Array} localPoint
 * @param  {Array} framePosition
 * @param  {Number} frameAngle
 */
vec2.toGlobalFrame = function(out, localPoint, framePosition, frameAngle){
    vec2.copy(out, localPoint);
    vec2.rotate(out, out, frameAngle);
    vec2.add(out, out, framePosition);
};

/**
 * Compute centroid of a triangle spanned by vectors a,b,c. See http://easycalculation.com/analytical/learn-centroid.php
 * @method centroid
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} a
 * @param  {Float32Array} b
 * @param  {Float32Array} c
 * @return  {Float32Array} The out object
 */
vec2.centroid = function(out, a, b, c){
    vec2.add(out, a, b);
    vec2.add(out, out, c);
    vec2.scale(out, out, 1/3);
    return out;
};

// Export everything
module.exports = vec2;
