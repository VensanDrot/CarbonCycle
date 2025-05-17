import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { quizQuestions } from "@/data";

export default function CarbonCycleExplorer() {
  const searchParams = useSearchParams();
  const [section, setSection] = useState("intro");

  useEffect(() => {
    const param = searchParams?.get("section");
    if (param) setSection(param);
  }, [searchParams]);

  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6 text-gray-800">
      {section === "intro" && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p>
              🌍 <strong>Welcome to the Carbon Cycle Explorer</strong>
              <br />
              Explore how <strong>carbon</strong> moves through the Earth’s systems — from the{" "}
              <strong>atmosphere</strong> to the <strong>ocean</strong>, through <strong>plants</strong>,{" "}
              <strong>animals</strong>, <strong>volcanoes</strong>, and <strong>factories</strong>, and deep into the{" "}
              <strong>soil</strong>.<br />
              This journey is called the <em>carbon cycle</em>.<br />
              <br />
              Use the buttons above to:
              <br />
              <br />
              • Learn about each part of the Earth system
              <br />
              • See how energy flows and carbon moves
              <br />
              • Test your knowledge in a quick quiz
              <br />
              • Interact with the full 3D carbon cycle model
              <br />
              <br />
              Let’s follow carbon’s path and see how life on Earth stays in balance.
            </p>
          </CardContent>
        </Card>
      )}

      {section === "systems" && (
        <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              name: "Atmosphere",
              emoji: "🌫️",
              desc: "The atmosphere contains carbon dioxide (CO₂), which is released from human activity, wildfires, volcanic eruptions, and respiration. It plays a key role in regulating Earth's climate through the greenhouse effect.",
            },
            {
              name: "Biosphere",
              emoji: "🌱",
              desc: "The biosphere includes all living organisms. Plants absorb CO₂ from the atmosphere through photosynthesis and store it in their tissues. Animals contribute by releasing CO₂ back through respiration and decay.",
            },
            {
              name: "Hydrosphere",
              emoji: "🌊",
              desc: "The hydrosphere includes oceans, lakes, and rivers. Oceans absorb large amounts of atmospheric CO₂, where it dissolves into water and forms carbonic acid, influencing marine ecosystems and long-term storage.",
            },
            {
              name: "Geosphere",
              emoji: "🪨",
              desc: "The geosphere stores carbon in the form of rocks, sediment, and fossil fuels. Carbon is locked in Earth's crust and released slowly through volcanic activity, erosion, and human extraction of coal, oil, and gas.",
            },
          ].map((s) => (
            <Card key={s.name} className="bg-white shadow">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">
                  {s.emoji} {s.name}
                </h2>
                <p>{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {section === "energy" && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">⚡ Energy in the Carbon Cycle</h2>
            <p>
              The <strong>Sun</strong> is the primary source of energy driving the carbon cycle. Through{" "}
              <em>photosynthesis</em>, plants convert sunlight into chemical energy, using it to absorb carbon dioxide
              (CO₂) from the atmosphere and store it in their biomass.
            </p>
            <p className="mt-3">
              When plants and animals die, or when fossil fuels such as coal, oil, and natural gas are burned,
              <strong>heat energy</strong> is released. This combustion process not only powers machines and provides
              heat but also releases stored carbon back into the <strong>atmosphere</strong> in the form of CO₂.
            </p>
            <p className="mt-3">
              This energy flow — from the Sun to living organisms and back into the atmosphere through respiration and
              burning — helps regulate Earth’s climate and supports life across the biosphere.
            </p>
          </CardContent>
        </Card>
      )}

      {section === "quiz" && (
        <Card className="max-w-xl mx-auto text-center">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🧠 Quick Quiz</h2>

            {quizStep < quizQuestions.length ? (
              <>
                <p className="mb-4">{quizQuestions[quizStep].question}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {quizQuestions[quizStep].options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        !showFeedback ? "outline" : option === quizQuestions[quizStep].answer ? "default" : "ghost" // fallback to a safe value
                      }
                      className={
                        showFeedback && option === selectedAnswer && option !== quizQuestions[quizStep].answer
                          ? "border-red-500 text-red-600"
                          : ""
                      }
                      onClick={() => {
                        if (!showFeedback) {
                          setSelectedAnswer(option);
                          setShowFeedback(true);
                          if (option === quizQuestions[quizStep].answer) {
                            setScore((prev) => prev + 1);
                          }
                        }
                      }}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-4">
                    <p className="font-medium text-lg">
                      {selectedAnswer === quizQuestions[quizStep].answer
                        ? "✅ Correct!"
                        : `❌ Incorrect. The correct answer is ${quizQuestions[quizStep].answer}.`}
                    </p>
                    <Button
                      className="mt-3"
                      onClick={() => {
                        setQuizStep((prev) => prev + 1);
                        setSelectedAnswer(null);
                        setShowFeedback(false);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">🎉 Quiz Completed!</h3>
                <p className="mt-2 text-lg">
                  Your Score: {score} / {quizQuestions.length}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setQuizStep(0);
                    setSelectedAnswer(null);
                    setScore(0);
                    setShowFeedback(false);
                  }}
                >
                  Restart Quiz
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* <footer className="text-center mt-10 text-sm text-gray-500">
        Built for science class 🌎 Powered by curiosity <Sparkles className="inline ml-1 h-4 w-4 text-yellow-400" />
      </footer> */}
    </div>
  );
}
