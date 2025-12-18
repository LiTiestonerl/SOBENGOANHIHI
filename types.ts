export interface QuizData {
  nickname: string;
  birthday: string;
  drink: string;
  style: string;
  angryAction: string;
  weekend: string;
  crushFactor: string;
}

export type StepProps = {
  data: QuizData;
  updateData: (fields: Partial<QuizData>) => void;
  onNext: () => void;
};