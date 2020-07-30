export const solarSystemData = {
    Sun: {
        orbitalPeriod: 0,
        color: "#ffffff",
        diameter: 696000,
        distance: 0,
        mass: 1989000,
        gravity: 274,
        isSun: true
    },
    Mercury: {
        orbitalPeriod: 88,
        diameter: 4879,
        color: '#CCCCCC',
        mass: 0.33,
        gravity: 3.7,
        distance: 57.9
    },
    Venus: {
        orbitalPeriod: 224.7,
        diameter: 12104,
        color: '#eef26b',
        mass: 4.87,
        gravity: 8.9,
        distance: 108.2
    },
    Earth: {
        orbitalPeriod: 365.2,
        diameter: 12756,
        satellite:[{name: 'moon', orbitalPeriod: 27.3, diameter: 3475}],
        color: '#5392c9',
        mass: 5.97,
        gravity: 9.8,
        distance: 149.6
    },
    Mars: {
        orbitalPeriod: 687,
        diameter: 6792,
        color: '#d96121',
        mass: 0.642,
        gravity: 3.7,
        distance: 227.9,
    },
    Jupiter: {
        orbitalPeriod: 4331,
        diameter: 142984,
        color: '#eb9100',
        mass: 1898,
        gravity: 23.1,
        distance: 778.6
    },
    Saturn: {
        orbitalPeriod: 10747,
        diameter: 120546,
        color: '#ebdb00',
        mass: 568,
        gravity: 9,
        distance: 1433.5
    },
    Uranus: {
        orbitalPeriod: 30689,
        diameter: 51118,
        color: '#89d8f5',
        mass: 86.8,
        gravity: 8.7,
        distance: 2872.5
    },
    Neptune: {
        orbitalPeriod: 59800,
        diameter: 49528,
        color: '#9ed4e8',
        mass: 102,
        gravity: 11,
        distance: 4495.1
    },
    Pluto: {
        orbitalPeriod: 90560,
        diameter: 2370,
        color: '#edd09a',
        mass: 0.0146,
        gravity: 0.7,
        distance: 5906.4
    }

}