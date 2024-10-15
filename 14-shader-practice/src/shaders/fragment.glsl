uniform float time;

void main() {
    float x = mod(gl_FragCoord.x, 20.0) < 10.0 ? 1.0 : 0.0;
    float y = mod(gl_FragCoord.y, 20.0) < 10.0 ? 1.0 : 0.0;

    float checkerPattern = min(x, y);

    vec3 color1 = vec3(0.1 + 0.5 * sin(time + gl_FragCoord.x * 0.4), 0.5, 0.5); 
    vec3 color2 = vec3(0.5, 0.5 + 0.5 * sin(time + gl_FragCoord.y * 0.4), 0.5);

    float gradientFactor = mod(gl_FragCoord.x + gl_FragCoord.y + time * 20.0, 20.0) / 20.0;

    vec3 gradientColor = mix(color1, color2, gradientFactor);

    gl_FragColor = vec4(gradientColor * checkerPattern, 1.0);
}
