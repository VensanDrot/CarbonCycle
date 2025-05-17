import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CarbonCycleExplorer() {
  const searchParams = useSearchParams();
  const [section, setSection] = useState("intro");

  useEffect(() => {
    const param = searchParams?.get("section");
    if (param) setSection(param);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6 text-gray-800">
      {section === "intro" && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-lg">
              Explore how <strong>carbon</strong> moves through the Earth's systems — from the atmosphere to the ocean,
              through living things, and deep into rocks. This is known as the <em>carbon cycle</em>.
            </p>
          </CardContent>
        </Card>
      )}

      {section === "systems" && (
        <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {[
            { name: "Atmosphere", emoji: "🌫️", desc: "Carbon dioxide is stored in the air." },
            { name: "Biosphere", emoji: "🌱", desc: "Plants take in CO₂ during photosynthesis." },
            { name: "Hydrosphere", emoji: "🌊", desc: "The ocean absorbs carbon from the air." },
            { name: "Geosphere", emoji: "🪨", desc: "Carbon is stored in rocks and fossil fuels." },
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
              The <strong>Sun</strong> provides energy for <em>photosynthesis</em>, allowing plants to absorb carbon.
              When fossil fuels are burned, <strong>heat energy</strong> is released, sending carbon back into the
              atmosphere.
            </p>
          </CardContent>
        </Card>
      )}

      {section === "quiz" && (
        <Card className="max-w-xl mx-auto text-center">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">🧠 Quick Quiz</h2>
            <p className="mb-4">Which Earth system includes plants and animals?</p>
            <Button variant="outline">Biosphere</Button>
            <Button variant="ghost">Atmosphere</Button>
            <Button variant="ghost">Geosphere</Button>
            <Button variant="ghost">Hydrosphere</Button>
          </CardContent>
        </Card>
      )}

      {/* <footer className="text-center mt-10 text-sm text-gray-500">
        Built for science class 🌎 Powered by curiosity <Sparkles className="inline ml-1 h-4 w-4 text-yellow-400" />
      </footer> */}
    </div>
  );
}
