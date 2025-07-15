export interface CardModel {
  id: number;
  title: string;
  titleEnglish: string;
  type: string;
  description: string;
  descriptionEnglish: string;
}

export interface TextualCardModel extends CardModel {
  data: CardTextDataModel[];
}

export interface GraphicalCardModel extends CardModel {
  options: string;
  optionsEnglish: string;
  hasTimeRangeFilter: boolean;
}

export interface ContainerCardModel extends CardModel {
  children: Card[];
}

export interface CardTextDataModel {
  amount: string;
  text: string;
  textEnglish: string;
}

export type Card = TextualCardModel | GraphicalCardModel | ContainerCardModel;
