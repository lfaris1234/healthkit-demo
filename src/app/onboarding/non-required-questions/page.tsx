import QuestionsForm from "./components/QuestionsForm";

export default function NonRequiredQuestionsPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Let’s know more about you</h1>
      <p className="text-gray-600 text-sm">
        These are optional and help personalise your dashboard.
      </p>
      <QuestionsForm />
    </div>
  );
}
