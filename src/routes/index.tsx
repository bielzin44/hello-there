import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  Expand,
  FileText,
  Search,
  ShieldCheck,
  Snowflake,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: RefrigeristaLanding });

const asset = "/images/refrigerista";

function caktoCheckout(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.origin === "https://pay.cakto.com.br" &&
      url.pathname.length > 1 &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

const plans = [
  {
    name: "Básico",
    price: "R$ 19,90",
    checkout:
      caktoCheckout(import.meta.env["VITE_CAKTO_BASICO_URL"]) ??
      "https://pay.cakto.com.br/33qmvhu_1329845",
    description: "Para ter os mapas de diagnóstico sempre à mão durante a visita.",
    features: [
      "6 cadernos em PDF · 240 páginas de conteúdo",
      "Geladeiras, split, inverter e refrigeração comercial",
      "Testes elétricos, vazamento, vácuo e carga",
    ],
  },
  {
    name: "Completo",
    price: "R$ 24,90",
    checkout:
      caktoCheckout(import.meta.env["VITE_CAKTO_COMPLETO_URL"]) ??
      "https://pay.cakto.com.br/8gwdoad_1329846",
    description: "Para organizar o atendimento inteiro, da primeira mensagem à entrega.",
    features: [
      "Os 6 cadernos do Básico + 10 bônus em PDF",
      "Modelos de orçamento, ordem de serviço e WhatsApp",
      "Checklists, guias de campo e chamados simulados",
    ],
  },
] as const;

const cadernos = [
  {
    title: "Mapa Visual Geral",
    description:
      "Encontre a ficha pelo sintoma em geladeiras, freezers, splits, bebedouros, purificadores e câmaras frias.",
    sample: "Geladeira não gela",
  },
  {
    title: "Diagnóstico Split",
    description:
      "Organize as verificações quando o split gela pouco, pinga, forma gelo ou desliga sozinho.",
    sample: "Água na unidade interna",
  },
  {
    title: "Mapa Elétrico do Refrigerista",
    description:
      "Consulte 30 fichas de medição e interpretação para componentes como capacitores, sensores, relés e compressores.",
    sample: "Capacitância do capacitor permanente",
  },
  {
    title: "Vazamento, Vácuo e Carga",
    description:
      "Siga a investigação do primeiro indício de vazamento ao registro de estanqueidade, vácuo, carga por massa e conferência final.",
    sample: "Falta de fluido, restrição ou pouco ar?",
  },
  {
    title: "Diagnóstico Inverter na Prática",
    description:
      "Relacione alimentação, comando, comunicação e compressor em geladeiras e splits inverter.",
    sample: "Placa, comunicação ou compressor?",
  },
  {
    title: "Refrigeração Comercial",
    description:
      "Investigue perda de rendimento, gelo, drenagem e falhas de controle em câmaras frias, expositores e balcões refrigerados.",
    sample: "Expositor perde rendimento no pico",
  },
];

const offerRepeats = [0, 1, 2, 3];

const bonuses = [
  ["Quanto cobrar?", "Calcule visita, deslocamento e hora técnica. Inclui modelos de orçamento."],
  ["WhatsApp do Refrigerista", "20 mensagens prontas, do primeiro contato ao pós-serviço."],
  [
    "10 Erros que Viram Retrabalho",
    "Reconheça decisões que podem transformar um chamado em duas visitas.",
  ],
  [
    "Ordem de Serviço e Entrega",
    "10 formulários para registrar o chamado, o aceite e o resultado.",
  ],
  ["Instalação de Split", "Guia visual da vistoria à entrega da instalação."],
  [
    "Atlas Visual de Gelo e Geada",
    "Compare padrões de gelo e saiba o que registrar antes de concluir.",
  ],
  ["Câmara Fria em Campo", "Organize a sequência de degelo, alarmes e histórico de temperatura."],
  ["Manutenção Preventiva", "Checklists por equipamento e calendário de próximas visitas."],
  ["10 Chamados Simulados", "Treine a primeira decisão em casos com respostas comentadas."],
  ["Compatibilidade de Peças", "Confira modelo, códigos e revisão antes de cotar ou comprar."],
];

const fieldExamples = [
  {
    index: 0,
    symptom: "A geladeira liga e não gela",
    description:
      "Use a ficha para separar uma dificuldade de circulação de ar de outros sinais de perda de refrigeração.",
  },
  {
    index: 1,
    symptom: "O split está pingando por dentro",
    description:
      "Localize os pontos de inspeção do dreno, da bandeja e do isolamento antes de decidir o próximo passo.",
  },
  {
    index: 5,
    symptom: "O expositor perde frio no horário de pico",
    description:
      "Organize os indícios de ventilação, abertura de portas e carga de produtos que aparecem durante o atendimento.",
  },
];

const faq = [
  [
    "Como recebo o material?",
    "Depois da confirmação do pagamento na Cakto, você acessa os PDFs no Cakto Members.",
  ],
  [
    "Preciso imprimir as fichas?",
    "Você pode salvar os PDFs no celular e imprimir em A4 as páginas que quiser levar na maleta.",
  ],
  [
    "Serve para quem está começando?",
    "Sim. As fichas ajudam a organizar a observação e a consulta. Em testes e intervenções, siga a documentação do fabricante e os procedimentos de segurança.",
  ],
];

function PlanButton({
  plan,
  compact = false,
}: {
  plan: (typeof plans)[number];
  compact?: boolean;
}) {
  return (
    <a className={`rf-cta ${plan.name === "Básico" ? "rf-cta-outline" : ""}`} href={plan.checkout}>
      {compact ? (
        <span>
          Quero o {plan.name} <strong>{plan.price}</strong>
        </span>
      ) : (
        <>Comprar Plano {plan.name}</>
      )}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

function OfferMarquee() {
  return (
    <div className="rf-topline" role="region" aria-label="Oferta relâmpago">
      <div className="rf-offer-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="rf-offer-strip" key={copy}>
            {offerRepeats.map((repeat) => (
              <span className="rf-offer-message" key={repeat}>
                ⚡ OFERTA RELÂMPAGO
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductMockup() {
  return (
    <figure className="rf-product">
      <img
        className="rf-portrait"
        src={`${asset}/tecnico.webp`}
        alt="Técnico de refrigeração segurando a capa do Mapa Visual em uma oficina"
        width={1000}
        height={667}
        fetchPriority="high"
      />
      <div className="rf-pack" aria-hidden="true">
        {[2, 3, 1].map((index) => (
          <img
            className={`rf-pack-cover rf-pack-cover-${index}`}
            key={index}
            src={`${asset}/caderno-${index}.webp`}
            width={420}
            height={594}
            alt=""
          />
        ))}
      </div>
      <figcaption>Material digital · 6 cadernos técnicos</figcaption>
    </figure>
  );
}

function FieldExamples() {
  return (
    <div id="exemplos" className="rf-field-examples">
      <div className="rf-section-head">
        <h3>Do relato do cliente à primeira verificação</h3>
      </div>
      <div className="rf-example-grid">
        {fieldExamples.map(({ index, symptom, description }) => (
          <article className="rf-example" key={symptom}>
            <a
              className="rf-example-art"
              href={`${asset}/ficha-${index + 1}.webp`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ampliar a ficha ${cadernos[index]?.sample} (nova aba)`}
            >
              <img
                src={`${asset}/ficha-${index + 1}.webp`}
                alt=""
                width={650}
                height={919}
                loading="lazy"
              />
              <span>
                <Expand size={17} aria-hidden="true" />
              </span>
            </a>
            <div className="rf-example-copy">
              <h4>{symptom}</h4>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="rf-steps" aria-label="Como consultar">
        <p>
          <Search size={18} aria-hidden="true" /> Encontre o sintoma
        </p>
        <p>
          <Wrench size={18} aria-hidden="true" /> Localize onde inspecionar
        </p>
        <p>
          <ClipboardList size={18} aria-hidden="true" /> Registre o que observou
        </p>
      </div>
    </div>
  );
}

function ProductPreview() {
  return (
    <section id="amostras" className="rf-section rf-samples" aria-labelledby="titulo-amostras">
      <div className="rf-wrap">
        <div className="rf-section-head">
          <h2 id="titulo-amostras">Veja como o produto funciona</h2>
          <p>Encontre o sintoma no índice e confira na ficha onde olhar e o que observar.</p>
        </div>
        <div className="rf-sample-window">
          <div className="rf-sample-track">
            {[false, true].map((clone) => (
              <div className="rf-sample-strip" key={String(clone)} aria-hidden={clone || undefined}>
                {cadernos.map(({ sample }, index) => (
                  <img
                    className="rf-sample-page"
                    key={sample}
                    src={`${asset}/ficha-${index + 1}.webp`}
                    width={650}
                    height={919}
                    decoding="async"
                    alt={clone ? "" : sample}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <FieldExamples />
      </div>
    </section>
  );
}

function RefrigeristaLanding() {
  return (
    <div className="rf-site">
      <a className="rf-skip" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <header className="rf-header">
        <OfferMarquee />
        <div className="rf-wrap rf-header-inner">
          <a className="rf-brand" href="#topo">
            <span>
              <Snowflake size={21} aria-hidden="true" />
            </span>{" "}
            Conexão Aluno
          </a>
          <nav aria-label="Navegação principal">
            <a className="rf-nav-examples" href="#amostras">
              Ver exemplos
            </a>
            <a className="rf-nav-examples" href="#cadernos">
              O que vem no kit
            </a>
            <a className="rf-header-cta" href="#oferta">
              Ver os planos <ArrowDown size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo-principal">
        <section id="topo" className="rf-hero" aria-labelledby="titulo-principal">
          <div className="rf-wrap rf-hero-grid">
            <div className="rf-hero-copy">
              <p className="rf-kicker">MAPA VISUAL DO TÉCNICO REFRIGERISTA</p>
              <h1 id="titulo-principal">
                “Liga, mas não gela.” <em>O que você verifica primeiro?</em>
              </h1>
              <p className="rf-hero-deck">
                Quando o cliente espera uma resposta, abra no celular a ficha do sintoma e encontre
                os primeiros pontos de inspeção. São <strong>6 cadernos em PDF</strong>, da
                geladeira ao split inverter e à refrigeração comercial.
              </p>
              <div className="rf-hero-actions" role="group" aria-label="Compra rápida">
                {plans.map((plan) => (
                  <PlanButton key={plan.name} plan={plan} compact />
                ))}
              </div>
              <p className="rf-trust">
                <ShieldCheck size={17} aria-hidden="true" /> Pagamento único · Acesso digital pela
                Cakto
              </p>
            </div>
            <ProductMockup />
          </div>
        </section>

        <ProductPreview />

        <section id="cadernos" className="rf-section" aria-labelledby="titulo-cadernos">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <h2 id="titulo-cadernos">Os 6 cadernos dos dois planos</h2>
              <p>
                Escolha o caderno pelo equipamento, pelo sintoma ou pelo componente que precisa
                verificar.
              </p>
            </div>
            <div className="rf-catalog">
              {cadernos.map((item, index) => (
                <article key={item.title}>
                  <img
                    src={`${asset}/caderno-${index + 1}.webp`}
                    width={420}
                    height={594}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bonus" className="rf-section rf-bonus" aria-labelledby="titulo-bonus">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <p className="rf-kicker">INCLUÍDOS NO PLANO COMPLETO</p>
              <h2 id="titulo-bonus">Os 10 bônus do Plano Completo</h2>
              <p>
                Tenha modelos para cobrar a visita, registrar o serviço e fazer o pós-atendimento.
              </p>
            </div>
            <div className="rf-catalog rf-bonus-grid">
              {bonuses.map(([title, description], index) => (
                <article key={title}>
                  <img
                    src={`${asset}/bonus-${index + 1}.webp`}
                    width={300}
                    height={424}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="oferta" className="rf-section rf-offer" aria-labelledby="titulo-oferta">
          <div className="rf-wrap">
            <div className="rf-section-head rf-center">
              <h2 id="titulo-oferta">Escolha seu plano</h2>
              <p>
                Os dois planos incluem os 6 cadernos. Por mais R$ 5,00, você leva os 10 bônus do
                Completo.
              </p>
            </div>
            <div className="rf-offer-grid">
              {plans.map((plan) => (
                <article
                  className={`rf-price-card ${plan.name === "Completo" ? "rf-price-card-full" : ""}`}
                  key={plan.name}
                >
                  <p className="rf-plan-includes">
                    {plan.name === "Completo" ? "6 CADERNOS + 10 BÔNUS" : "6 CADERNOS EM PDF"}
                  </p>
                  <h3>Plano {plan.name}</h3>
                  <p className="rf-plan-description">{plan.description}</p>
                  <p className="rf-plan-price">{plan.price}</p>
                  <p className="rf-pay-info">Pagamento único</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <PlanButton plan={plan} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rf-section rf-faq" aria-labelledby="titulo-duvidas">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <h2 id="titulo-duvidas">Dúvidas frequentes</h2>
            </div>
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
            <a className="rf-cta rf-faq-cta" href="#oferta">
              Escolher meu plano <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="rf-footer">
        <div className="rf-wrap">
          <span>
            <Snowflake size={18} aria-hidden="true" /> Conexão Aluno · Mapa Visual do Técnico
            Refrigerista
          </span>
          <span>
            <FileText size={17} aria-hidden="true" /> Material digital em PDF
          </span>
        </div>
      </footer>
    </div>
  );
}
