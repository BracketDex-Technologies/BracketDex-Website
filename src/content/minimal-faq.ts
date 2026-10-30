import { marketingContent } from "./marketing";

export const minimalFaqs = [
  {
    question: "Where should a first conversation start?",
    answer: "Tell us about the situation, the tools involved, and the change you need. That gives the discussion a useful starting point.",
  },
  {
    question: "Can you work with our existing systems?",
    answer: marketingContent.faqs[2].answer,
  },
  {
    question: "Does every project need a new platform?",
    answer: "Not always. We can integrate, improve, or modernize existing systems. The approach depends on your business requirements.",
  },
  {
    question: "Can AI be part of the scope?",
    answer: marketingContent.faqs[4].answer,
  },
  {
    question: "What happens after launch?",
    answer: marketingContent.faqs[1].answer,
  },
] as const;
