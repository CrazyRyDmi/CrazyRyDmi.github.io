varying vec2 texPos;

void main() {
    texPos = uv.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}