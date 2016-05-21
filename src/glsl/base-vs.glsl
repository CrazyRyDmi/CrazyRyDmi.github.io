varying vec2 texPos;

void main() {
    texPos = position.xy;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}