type TemType =
  | "neutral"
  | "wind"
  | "earth"
  | "water"
  | "fire"
  | "nature"
  | "electric"
  | "mental"
  | "digital"
  | "melee"
  | "crystal"
  | "toxic";

type TypeSquare = Record<TemType, Record<TemType, number>>;

export const typeSquare: TypeSquare = {
  neutral: {
    neutral: 1,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 0.5,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 1,
  },
  wind: {
    neutral: 1,
    wind: 0.5,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 0.5,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 2,
  },
  earth: {
    neutral: 1,
    wind: 0.5,
    earth: 1,
    water: 0.5,
    fire: 2,
    nature: 0.5,
    electric: 2,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 2,
    toxic: 1,
  },
  water: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 0.5,
    fire: 2,
    nature: 0.5,
    electric: 1,
    mental: 1,
    digital: 2,
    melee: 1,
    crystal: 1,
    toxic: 0.5,
  },
  fire: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 0.5,
    fire: 0.5,
    nature: 2,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 2,
    toxic: 1,
  },
  nature: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 2,
    fire: 0.5,
    nature: 0.5,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 0.5,
  },
  electric: {
    neutral: 1,
    wind: 2,
    earth: 0.5,
    water: 2,
    fire: 1,
    nature: 0.5,
    electric: 0.5,
    mental: 2,
    digital: 2,
    melee: 1,
    crystal: 0.5,
    toxic: 1,
  },
  mental: {
    neutral: 2,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 2,
    crystal: 0.5,
    toxic: 1,
  },
  digital: {
    neutral: 1,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 2,
    digital: 2,
    melee: 2,
    crystal: 1,
    toxic: 1,
  },
  melee: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 0.5,
    digital: 1,
    melee: 0.5,
    crystal: 2,
    toxic: 1,
  },
  crystal: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 1,
    fire: 0.5,
    nature: 1,
    electric: 2,
    mental: 2,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 1,
  },
  toxic: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 2,
    fire: 1,
    nature: 2,
    electric: 1,
    mental: 1,
    digital: 0.5,
    melee: 1,
    crystal: 0.5,
    toxic: 0.5,
  },
};

export const temtems = {};
