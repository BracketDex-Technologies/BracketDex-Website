export const solutionScenarios = [
  {
    id: "repeated-approvals", label: "Repeated approvals",
    before: { title: "Every approval needs a chase.", description: "Requests move between people, sit in inboxes and spreadsheets, and are hard to track. Progress depends on follow-ups and memory, so things get delayed." },
    change: { title: "Give each decision an owner.", description: "Every approval has a clear owner, context and timeframe. People know what to review, and the next step happens automatically.", stages: ["Request submitted", "Owner reviews", "Decision recorded"] },
    after: { title: "Work has a visible next step.", description: "Everyone can see what’s next, who it’s with and when it’s due. Work moves forward without chasing, with fewer delays and clearer accountability." },
  },
  {
    id: "fragmented-records", label: "Fragmented records",
    before: { title: "The answer lives in several places.", description: "Teams check separate files and conversations to understand the same piece of work. Versions drift, context gets lost, and the next person has to ask again." },
    change: { title: "Give each record a shared home.", description: "Bring the information needed for a decision together. Agree who maintains it, who can use it, and how updates reach the people who depend on them.", stages: ["Record captured", "Context checked", "Update shared"] },
    after: { title: "The next person has the context.", description: "People can find the current record, understand its history and pick up the work. A shared view makes handoffs clearer and reduces repeated questions." },
  },
  {
    id: "growing-demand", label: "Growing demand",
    before: { title: "More work arrives than the team can see.", description: "Requests arrive through different channels. Urgent work interrupts planned work, priorities shift, and it becomes difficult to see what the team can take on next." },
    change: { title: "Make capacity part of the decision.", description: "Bring requests into a visible queue. Give each item a priority and an owner, then agree how work moves forward when the team has capacity.", stages: ["Request queued", "Priority agreed", "Work assigned"] },
    after: { title: "The team can choose what comes next.", description: "People can see what is waiting, what is underway and where a decision is needed. Demand becomes a conversation about priorities, with a clearer path through the work." },
  },
] as const;

export const solutionTestQuestions = [
  { question: "Who should notice the difference?", guidance: "Name the people affected by the situation. Start with the person doing the work and the person waiting for its result." },
  { question: "Which part of the day should change?", guidance: "Choose a specific moment: finding a record, handing work over, reviewing a request or deciding what happens next." },
  { question: "What would make that change visible?", guidance: "Agree what you could observe in the work, such as a clear owner, a current record or a next step that no longer needs a reminder." },
] as const;
