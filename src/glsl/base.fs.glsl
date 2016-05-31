
uniform sampler2D texture;
uniform sampler2D squareTex;
varying vec2 texPos;

void main() {
    vec3 coord = normalize(gl_FragCoord.xyz);
    vec4 texColor = texture2D( texture, texPos );
    vec4 squareColor = texture2D(squareTex, texPos);

    // gl_FragColor = texColor * squareColor * vec4(coord.x, coord.y, coord.z, 1.0);
    gl_FragColor = texColor * vec4(coord.x, coord.y, coord.z, 1.0);
}