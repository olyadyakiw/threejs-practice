uniform float time;

void main() {
    // Створюємо анімацію, зміщуючи позицію вершин на основі часу
    vec3 animatedPosition = position;

    animatedPosition.x += sin(time + position.x * 5.0) * 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPosition, 1.0);
}
