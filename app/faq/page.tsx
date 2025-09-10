const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function FAQPage() {
  const faqs = [
    {
      q: "@Izzi, o que é o Mapa Astral?",
      a: "É a foto do céu do dia do seu nascimento. Traz vários símbolos para você entender mais da sua trajetória. Simplificando, é uma leitura do seu manual simbólico para se autoconhecer e viver a vida mais ciente da própria natureza.",
    },
    {
      q: "O que eu preciso para fazer parte?",
      a: "Seu dia de nascimento, local e horário (pela certidão) e um Whatsapp para contato. Além de vontade de se autoconhecer!",
    },
    {
      q: "Como funciona Assinatura Izzi?",
      a: "Você vai receber os conteúdos pelo nosso número exclusivo de whatsapp. Após a inscrição, antes do próximo domingo, nós iniciamos uma conversa com você, sendo um espaço livre para interagir e tirar dúvidas. Cada troca vai dando possibilidade de personalizar mais sua experiência.",
    },
    {
      q: "Porque o horário de nascimento é importante?",
      a: "A partir do seu horário (exato) de nascimento diferenciamos o mapa coletivo  do seu mapa único e individual! O horário de nascimento é muito importante para localizarmos sua experiência única na vastidão dos nascimentos, isso que faz nosso produto super personalizado!",
    },
    {
      q: "Como vou receber?",
      a: "Depois de preencher seus dados no site você receberá - no Whatsapp - um resumo do seu Mapa Astral e 2 semanas de Horóscopo e Tarot como teste grátis. Até este momento não é necessário preencher dados de cartão. Caso você queira continuar com a assinatura te enviamos um link para pagamento ;)",
    },
    {
      q: "O que astrologia e tarot tem em comum?",
      a: "Ambas são linguagens simbólicas e as usamos de formas complementar para oferecer uma leitura autêntica e interconectada. Costumamos dizer que o Horóscopo nos conecta com o Tempo e o Tarot com o espaço.",
    },
    {
      q: "Isso é leitura do futuro?",
      a: "Por mais que seja comum buscar previsões com essas ferramentas (e tá tudo bem), na Izzi, preferimos trazer nos conteúdos um olhar sobre tendências, onde o destino é uma construção coletiva entre consciente e inconsciente, e reside nas escolhas que fazemos dia após dia, com um 'empurraozinho' da astrologia e do tarot",
    },
    {
      q: "Como a @Izzi utiliza a tecnologia?",
      a: "Na @Izzi contamos com profissionais especializados em Astrologia, Tarot e Tech. Apenas utilizamos a tecnologia como ferramenta para auxiliar nas leituras, sempre com supervisão da nossa equipe.",
    },
    {
      q: "E se eu quiser cancelar a assinatura? Como faço?",
      a: "Caso você desista da assinatura, basta nos avisar via Whatsapp. Te enviamos um comprovante de cancelamento e você não será mais cobrado a partir desse dia.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        className="py-28 relative"
        style={{
          backgroundImage: `url('${prefix}/soft-cloudy-sky-background-in-blue-tones.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 font-playfair italic text-center">
            perguntas frequentes
          </h1>
          <p className="text-center text-white/80 mb-12 font-inter">
            tira suas dúvidas rapidinho ✨
          </p>

          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-white/80 backdrop-blur border border-white/30 
                           p-5 shadow-sm transition-all open:shadow-md"
              >
                <summary className="cursor-pointer flex items-center justify-between text-lg font-inter font-medium text-foreground/90">
                  {item.q}
                  <span className="ml-3 inline-block transform transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-foreground/80 font-inter leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/#join-form"
              className="inline-block bg-foreground text-background px-8 py-3 rounded-full font-light font-inter hover:bg-foreground/90 transition"
            >
              fazer parte
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
