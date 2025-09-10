"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Star, Heart, Moon } from "lucide-react";

const STRIPE_URL = "https://buy.stripe.com/4gMcN51NGdei6w20mEfMA0a";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Errors = Partial<
  Record<"email" | "birthDate" | "birthTime" | "phone", string>
>;

const TESTIMONIALS = [
  {
    initials: "G.M.",
    text: "o mapa astral é incrível! me fez entender melhor minha personalidade e como posso melhorar alguns aspectos da minha vida. a izzi fala de um jeito que faz sentido, sabe?",
  },
  {
    initials: "T.A.",
    text: "eu amo fazer consulta sobre tarot! sempre me ajuda a entender melhor minha vida e me dá insights valiosos. é como conversar com uma amiga que entende dos astros.",
  },
  {
    initials: "L.S.",
    text: "receber no whatsapp é perfeito. direto ao ponto, com carinho e sem enrolação. virou meu ritual de domingo!",
  },
  {
    initials: "B.R.",
    text: "achei muito respeitoso e acolhedor. as leituras parecem realmente feitas pra mim, com base no meu mapa.",
  },
  {
    initials: "M.P.",
    text: "o mensal + semanal me ajuda a organizar a cabeça e priorizar o que importa. virou autocuidado prático.",
  },
];

export default function HomePage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // testimonials carousel
  const [tIndex, setTIndex] = useState(0);
  const nextT = () => setTIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevT = () =>
    setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  function scrollToForm() {
    document
      .getElementById("join-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validate(): boolean {
    const e: Errors = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) e.email = "Informe um e-mail válido.";
    if (!birthDate) e.birthDate = "Informe a data de nascimento.";
    if (!birthTime) e.birthTime = "Informe o horário de nascimento.";
    const digits = phone.replace(/\D/g, "");
    const phoneOk = new RegExp(`^\\+\\d{1,3}\\d{7,14}$`).test(
      countryCode + digits
    );
    if (!digits || !phoneOk) e.phone = "Informe um telefone válido com DDI.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    if (loading) return;
    if (!validate()) return;
    setLoading(true);
    try {
      window.location.href = STRIPE_URL;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 pt-8">
            <div className="flex items-center space-x-8 text-white">
              <a
                href="#sobre-nos"
                className="text-sm font-light hover:text-white/80 transition-colors font-inter"
              >
                sobre nós
              </a>
              <a
                href={`${prefix}/faq`}
                className="text-sm font-light hover:text-white/80 transition-colors font-inter"
              >
                perguntas frequentes
              </a>
              <a
                href="#join-form"
                className="text-sm font-light hover:text-white/80 transition-colors font-inter"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToForm();
                }}
              >
                faça parte
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat texture-overlay"
          style={{
            backgroundImage: `url('${prefix}/dreamy-cloudy-sky-background-with-soft-blue-and-wh.png')`,
          }}
        >
          <div className="absolute inset-0 bg-primary/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-balance leading-tight font-playfair italic">
              @Izzi Astros & Tarot
            </h1>
            <p className="text-lg md:text-xl font-light mb-4 text-white/90 leading-relaxed font-inter">
              somos encontro, acolhimento e presença.
            </p>
            <p className="text-base md:text-lg font-light mb-8 text-white/80 leading-relaxed font-inter">
              acreditamos que autoconhecimento é caminho – e é mais leve quando
              é feito junto. abrimos espaço para quem busca respostas, clareza
              ou só um abraço cósmico no meio do caos do dia a dia.
            </p>
            <Button
              className="bg-transparent border border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-8 py-3 text-sm font-light tracking-wide font-inter"
              variant="outline"
              onClick={scrollToForm}
            >
              TESTE GRÁTIS
            </Button>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              <div className="relative z-20 transform rotate-12">
                <div className="w-64 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    <img
                      src={`${prefix}/tarot-app-interface-with-cards-and-mystical-design.png`}
                      alt="Interface do App de Tarot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute top-12 -right-8 z-10 transform -rotate-6">
                <div className="w-56 h-[440px] bg-black rounded-[2.5rem] p-2 shadow-xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    <img
                      src={`${prefix}/astrology-app-interface-with-birth-chart-and-celes.png`}
                      alt="Interface do App de Astrologia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre-nos" className="py-20 bg-primary text-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-12 font-playfair italic">
              nós
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center">
              <div className="mb-8">
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              </div>
              <p className="text-lg font-light leading-relaxed text-background/90 font-inter">
                enviamos leituras de horóscopos e tarot no seu whatsapp todo
                domingo e primeiro dia do mês, de acordo com seu mapa natal
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <Moon className="h-12 w-12 text-accent mx-auto mb-4" />
              </div>
              <p className="text-lg font-light leading-relaxed text-background/90 font-inter">
                somos um oráculo feito por profissionais da área pra incentivar
                sua autorreflexão
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Natal Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-12 font-playfair italic">
              tudo começa com o seu mapa natal
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center space-x-4">
              <div className="w-48 h-[380px] bg-foreground rounded-[2rem] p-2 shadow-lg">
                <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                  <img
                    src={`${prefix}/birth-chart-calculation-interface-with-astrologica.png`}
                    alt="Interface de Cálculo do Mapa Natal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-48 h-[380px] bg-foreground rounded-[2rem] p-2 shadow-lg">
                <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                  <img
                    src={`${prefix}/astrological-reading-interface-with-planetary-posi.png`}
                    alt="Interface de Leitura Astrológica"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-48 h-[380px] bg-foreground rounded-[2rem] p-2 shadow-lg">
                <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                  <img
                    src={`${prefix}/detailed-birth-chart-analysis-with-interpretations.png`}
                    alt="Análise Detalhada do Mapa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={`${prefix}/detailed-astrological-birth-chart-wheel-with-zodia.png`}
                  alt="Mapa Astrológico"
                  className="w-72 h-72 rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl font-light text-foreground mb-12 font-inter">
              acompanhe como seus traços e tendências dançam com o movimento dos
              planetas
            </p>

            <div className="max-w-2xl mx-auto">
              <img
                src={`${prefix}/tarot-card-spread-with-mystical-design-and-explana.png`}
                alt="Informações sobre Tarot"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl font-light text-foreground font-inter">
              personalize sua experiência conversando conosco – um canal aberto
              com quem entende do assunto
            </p>
          </div>
        </div>
      </section>

      {/* Video Section (YouTube embed) */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Byzrk8yOLyg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-lg font-light text-foreground font-inter">
                vem descobrir insights sobre como viver melhor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Fazer Parte Section */}
      <section
        id="join-form"
        ref={formRef}
        className="py-20 relative"
        style={{
          backgroundImage: `url('${prefix}/soft-cloudy-sky-background-in-blue-tones.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/40 texture-overlay"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 font-playfair italic">
              como fazer parte?
            </h2>
            <p className="text-lg text-white/90 font-light font-inter">
              compartilha seus dados e recebe conteúdo personalizado sobre
              astrologia e tarot
            </p>
          </div>

          <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
            <Input
              placeholder="nome"
              className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div>
              <Input
                type="email"
                placeholder="email"
                className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-100 mt-1 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-3">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-32 h-12 rounded-md bg-white/95 border-0 text-foreground px-3"
                aria-label="Código do país"
              >
                <option value="+351">🇵🇹 +351</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <Input
                inputMode="tel"
                placeholder="telefone (somente números)"
                className="flex-1 bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && (
              <p className="text-red-100 mt-1 text-sm">{errors.phone}</p>
            )}

            <div>
              <Input
                type="date"
                placeholder="data de nascimento"
                className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              {errors.birthDate && (
                <p className="text-red-100 mt-1 text-sm">{errors.birthDate}</p>
              )}
            </div>

            <div>
              <Input
                type="time"
                step={60}
                placeholder="horário de nascimento (24h)"
                className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
              />
              {errors.birthTime && (
                <p className="text-red-100 mt-1 text-sm">{errors.birthTime}</p>
              )}
            </div>

            <Input
              placeholder="local de nascimento"
              className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 font-inter"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full bg-foreground hover:bg-foreground/90 text-background h-12 font-light tracking-wide font-inter"
              disabled={loading}
            >
              {loading ? "Redirecionando..." : "TESTE GRÁTIS"}
            </Button>
          </form>

          <p className="text-center text-white/80 text-sm mt-4 font-light font-inter">
            seus dados estão protegidos e não serão compartilhados ✨
          </p>
        </div>
      </section>

      {/* Testimonials Section — 2 por vez no desktop, 1 no mobile, controles abaixo */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8 font-playfair italic">
              estão dizendo por aí...
            </h2>
          </div>

          {(() => {
            const i1 = tIndex;
            const i2 = (tIndex + 1) % TESTIMONIALS.length;
            const pair = [i1, i2];

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                  {pair.map((i, k) => (
                    <div
                      key={`${i}-${k}`}
                      className={k === 1 ? "hidden md:block" : ""}
                    >
                      <Card className="h-full bg-accent text-accent-foreground p-6 md:p-8 shadow-lg rounded-2xl">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xl md:text-2xl font-light font-inter">
                              {TESTIMONIALS[i].initials}
                            </span>
                            <Star className="h-6 w-6 md:h-7 md:w-7 text-accent-foreground" />
                          </div>
                          <p className="font-light leading-relaxed font-inter text-base md:text-lg">
                            “{TESTIMONIALS[i].text}”
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
                  <button
                    onClick={prevT}
                    aria-label="depoimento anterior"
                    className="inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-foreground/20 bg-background/70 hover:bg-background/90 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2 md:gap-3">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTIndex(i)}
                        aria-label={`ir para depoimento ${i + 1}`}
                        className={`h-1.5 md:h-2 rounded-full transition-all ${
                          i === tIndex
                            ? "bg-foreground w-6 md:w-8"
                            : "bg-muted w-2.5 md:w-3.5"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextT}
                    aria-label="próximo depoimento"
                    className="inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-foreground/20 bg-background/70 hover:bg-background/90 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 relative text-white"
        style={{
          backgroundImage: `url('${prefix}/dark-cloudy-sky-background-for-footer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/70 texture-overlay"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-light mb-2 font-playfair italic">
            com amor, izzi ✨
          </h3>

          <p className="text-white/80 font-light font-inter mb-1">
            sua amiga do céu
          </p>

          <p className="text-white/80 font-light font-inter">
            acompanhe a gente no{" "}
            <a
              href="https://www.instagram.com/izzi.astrosetarot/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Instagram
            </a>
          </p>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-white/60 font-light font-inter">
              © 2025 Izzi Astros & Tarot.
            </p>
            <p className="text-sm text-white/60 font-light font-inter">
              feito com carinho para quem busca se conhecer melhor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
