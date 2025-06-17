export const getRandomColor = (colors) =>
    colors[Math.floor(Math.random() * colors.length)];

export const getNewColor = (prevColor, colors) => {
    const index = colors.findIndex((color) => color.name === prevColor.name);
    const nextIndex = (index + 1) % colors.length;
    return colors[nextIndex];
};

export const createRandomGrid = ({ rows, cols }, colors) =>
    Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => getRandomColor(colors))
    );
