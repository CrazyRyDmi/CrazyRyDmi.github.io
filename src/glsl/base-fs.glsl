uniform sampler2D texture;
varying vec2 texPos;

void main() {
    vec3 coord = normalize(gl_FragCoord.xyz);
    vec4 texColor = texture2D( texture, texPos );

    gl_FragColor = texColor * vec4(coord.x, coord.y, coord.z, 1.0);
}