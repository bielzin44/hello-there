import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  Expand,
  Menu,
  MessageCircle,
  Pause,
  Play,
  Search,
  Snowflake,
  Wrench,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: RefrigeristaLanding });

const asset = "/images/refrigerista";
const contact = import.meta.env["VITE_WHATSAPP_NUMBER"]?.trim().replace(/\D/g, "");
const hasWhatsApp = /^55\d{10,11}$/.test(contact ?? "");

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
    checkout: caktoCheckout(import.meta.env["VITE_CAKTO_BASICO_URL"]),
    description: "A biblioteca de diagnóstico doméstico e comercial.",
    features: [
      "6 cadernos técnicos em PDF",
      "Diagnóstico por sintoma, testes elétricos e inverter",
      "Vazamento, vácuo, carga e refrigeração comercial",
      "240 páginas de conteúdo",
    ],
  },
  {
    name: "Completo",
    price: "R$ 24,90",
    checkout: caktoCheckout(import.meta.env["VITE_CAKTO_COMPLETO_URL"]),
    description: "A biblioteca técnica e ferramentas para o dia a dia do atendimento.",
    features: [
      "Todos os 6 cadernos do Básico",
      "10 bônus com modelos, guias e checklists",
      "350 páginas de conteúdo em 16 PDFs",
    ],
  },
];

const [basicPlan, completePlan] = plans;
const usesCakto = Boolean(basicPlan?.checkout || completePlan?.checkout);
const canBuyBothPlans = plans.every((plan) => plan.checkout || hasWhatsApp);

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

const faq = [
  [
    "O que muda entre os dois planos?",
    "Os dois planos incluem os seis cadernos. O Completo também inclui os dez bônus. As contagens são de páginas de conteúdo, além das capas.",
  ],
  [
    "Como recebo e quando pago?",
    usesCakto
      ? "Escolha seu plano e siga as instruções no botão. No checkout da Cakto, o acesso digital é liberado após a confirmação do pagamento."
      : "No atendimento por WhatsApp, você recebe os PDFs do plano escolhido, confere o material e faz o pagamento único.",
  ],
  [
    "Preciso imprimir?",
    "Você pode consultar os PDFs pelo celular ou imprimir as fichas que quiser em papel A4.",
  ],
  [
    "Serve para quem está começando?",
    "Sim. As fichas ajudam a organizar as primeiras verificações e os indícios. Em testes ou intervenções, siga a documentação e os procedimentos de segurança do equipamento.",
  ],
  [
    "Quais equipamentos aparecem no Mapa?",
    "Geladeiras, freezers, splits, bebedouros, purificadores, câmaras frias, expositores e balcões refrigerados. Os cadernos incluem fichas dedicadas a diagnóstico elétrico e inverter.",
  ],
];

function PlanButton({ plan }: { plan: (typeof plans)[number] }) {
  const message = `Olá! Quero receber o Plano ${plan.name} do Mapa Visual do Técnico Refrigerista por ${plan.price}.`;
  const label = `Quero o ${plan.name}`;

  if (plan.checkout) {
    return (
      <a className="rf-cta" href={plan.checkout}>
        {label} <ArrowRight size={19} aria-hidden="true" />
      </a>
    );
  }

  if (!hasWhatsApp) {
    return (
      <button type="button" className="rf-cta" disabled>
        {label}
      </button>
    );
  }

  return (
    <a
      className="rf-cta"
      href={`https://wa.me/${contact}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={19} aria-hidden="true" /> {label}
    </a>
  );
}

function PageCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLDivElement>(null);
  const resumeAfter = useRef(0);
  const [motion, setMotion] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = rail.current;
    const row = original.current;
    if (!viewport || !row || !motion || reducedMotion) return;

    let animation = 0;
    let previousTime = 0;
    let remainder = 0;
    const scroll = (time: number) => {
      if (
        previousTime &&
        time > resumeAfter.current &&
        !viewport.matches(":hover, :focus-within")
      ) {
        remainder += Math.min(time - previousTime, 50) * 0.034;
        const pixels = Math.floor(remainder);
        const cycle = row.offsetWidth;
        if (pixels && cycle) {
          viewport.scrollLeft = (viewport.scrollLeft + pixels) % cycle;
          remainder -= pixels;
        }
      }
      previousTime = time;
      animation = requestAnimationFrame(scroll);
    };
    animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, [motion, reducedMotion]);

  function move(direction: number) {
    const viewport = rail.current;
    const row = original.current;
    const card = row?.firstElementChild;
    if (!viewport || !row || !card) return;
    resumeAfter.current = performance.now() + 5000;
    const cycle = row.offsetWidth;
    let start = viewport.scrollLeft % cycle;
    const step = card.getBoundingClientRect().width + 16;
    if (direction < 0 && start < step) start += cycle;
    viewport.scrollLeft = start;
    viewport.scrollBy({ left: direction * step, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <section id="amostras" className="rf-section rf-samples" aria-labelledby="titulo-amostras">
      <div className="rf-wrap">
        <div className="rf-section-head rf-samples-head">
          <div>
            <h2 id="titulo-amostras">Veja os mapas por dentro</h2>
            <p>Toque numa ficha para ampliar e ver como o diagnóstico é organizado.</p>
          </div>
          <div className="rf-carousel-controls" aria-label="Controles das amostras">
            <button type="button" onClick={() => move(-1)} aria-label="Ficha anterior">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Próxima ficha">
              <ArrowRight size={20} />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setMotion(!motion)}
                aria-label={motion ? "Pausar amostras" : "Reproduzir amostras"}
              >
                {motion ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}
          </div>
        </div>
        <div
          className="rf-carousel"
          ref={rail}
          onPointerDown={() => {
            resumeAfter.current = performance.now() + 5000;
          }}
        >
          {[false, true].map((clone) => (
            <div
              className="rf-carousel-row"
              key={String(clone)}
              ref={clone ? undefined : original}
              aria-hidden={clone || undefined}
            >
              {cadernos.map((item, index) => (
                <a
                  className="rf-slide"
                  key={item.title}
                  href={`${asset}/ficha-${index + 1}.webp`}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={clone ? -1 : undefined}
                >
                  <img
                    src={`${asset}/ficha-${index + 1}.webp`}
                    width={650}
                    height={919}
                    loading={index < 3 ? "eager" : "lazy"}
                    alt={clone ? "" : `Ficha: ${item.sample}`}
                  />
                  <span>
                    {item.sample}
                    <Expand size={15} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
        <a className="rf-text-link" href="#oferta">
          Comparar os planos <ArrowDown size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function RefrigeristaLanding() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="rf-site">
      <a href="#conteudo-principal" className="rf-skip">
        Pular para o conteúdo
      </a>
      <header className="rf-header">
        <div className="rf-wrap rf-head-inner">
          <a className="rf-brand" href="#topo">
            <span>
              <Snowflake size={22} aria-hidden="true" />
            </span>
            <div>
              Mapa Visual <small>DO TÉCNICO REFRIGERISTA</small>
            </div>
          </a>
          <button
            className="rf-menu"
            type="button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="navegacao"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav id="navegacao" aria-label="Navegação principal" className={menu ? "is-open" : ""}>
            <a href="#amostras" onClick={() => setMenu(false)}>
              Ver amostras
            </a>
            <a href="#bonus" onClick={() => setMenu(false)}>
              Bônus
            </a>
            <a href="#perguntas" onClick={() => setMenu(false)}>
              Dúvidas
            </a>
            <a className="rf-head-action" href="#oferta" onClick={() => setMenu(false)}>
              Ver planos <ArrowRight size={15} />
            </a>
          </nav>
        </div>
      </header>
      <main id="conteudo-principal">
        <section id="topo" className="rf-hero">
          <div className="rf-wrap rf-hero-grid">
            <div className="rf-hero-copy">
              <p className="rf-kicker">
                <span /> GUIA DIGITAL DE CAMPO
              </p>
              <h1>
                Encontre o sintoma.
                <br />
                <em>Saiba o que verificar primeiro.</em>
              </h1>
              <p className="rf-hero-text">
                A geladeira liga e não gela? O split pinga pela frente? Abra o{" "}
                <strong>Mapa Visual do Técnico Refrigerista</strong> no celular e encontre a ficha
                com os pontos de inspeção e os próximos passos.
              </p>
              <div className="rf-hero-actions">
                <a className="rf-cta" href="#oferta">
                  Ver os planos <ArrowRight size={18} aria-hidden="true" />
                </a>
                <span className="rf-hero-price">
                  A partir de <strong>{basicPlan?.price}</strong>
                </span>
              </div>
              <p className="rf-hero-note">
                <Check size={16} aria-hidden="true" />{" "}
                {usesCakto
                  ? "Material digital em PDF. Pagamento único."
                  : "Receba os PDFs, confira e só depois pague."}
              </p>
            </div>
            <figure
              className="rf-product"
              aria-label="Mockup dos cadernos e de uma ficha em um celular"
            >
              <div className="rf-product-grid" aria-hidden="true" />
              <div className="rf-book-shadow rf-book-left">
                <img src={`${asset}/caderno-2.webp`} alt="" width={420} height={594} />
              </div>
              <div className="rf-book-shadow rf-book-right">
                <img src={`${asset}/caderno-5.webp`} alt="" width={420} height={594} />
              </div>
              <div className="rf-book-shadow rf-book-main">
                <img
                  src={`${asset}/caderno-1.webp`}
                  alt="Capa do Mapa Visual do Técnico Refrigerista"
                  width={420}
                  height={594}
                  fetchPriority="high"
                />
              </div>
              <div className="rf-phone">
                <img
                  src={`${asset}/ficha-1.webp`}
                  alt="Ficha Geladeira não gela exibida em um celular"
                  width={650}
                  height={919}
                />
              </div>
              <figcaption>Capas e ficha reais do material</figcaption>
            </figure>
          </div>
        </section>

        <PageCarousel />

        <section className="rf-section rf-workflow" aria-labelledby="consulta">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <p className="rf-kicker">
                <span /> NO MEIO DO ATENDIMENTO
              </p>
              <h2 id="consulta">Do relato do cliente à primeira verificação</h2>
            </div>
            <div className="rf-workflow-grid">
              {[
                [
                  Search,
                  "Escolha o equipamento",
                  "Abra o índice e localize o sintoma mais próximo do que você está observando.",
                ],
                [
                  Wrench,
                  "Localize os pontos de inspeção",
                  "Veja no desenho onde olhar e quais indícios ajudam a orientar o próximo passo.",
                ],
                [
                  ClipboardList,
                  "Registre o que encontrou",
                  "Anote as observações e procure a ficha técnica seguinte quando precisar aprofundar.",
                ],
              ].map(([Icon, title, text]) => {
                const StepIcon = Icon as typeof Search;
                return (
                  <article key={String(title)}>
                    <span className="rf-step-icon">
                      <StepIcon size={22} aria-hidden="true" />
                    </span>
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cadernos" className="rf-section rf-cadernos" aria-labelledby="titulo-cadernos">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <h2 id="titulo-cadernos">Seis cadernos para consultar em campo</h2>
              <p>Os seis cadernos estão nos dois planos.</p>
            </div>
            <div className="rf-volume-grid">
              {cadernos.map((item, index) => (
                <article key={item.title}>
                  <img
                    src={`${asset}/caderno-${index + 1}.webp`}
                    alt=""
                    width={420}
                    height={594}
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

        <section className="rf-section rf-context" aria-labelledby="campo">
          <div className="rf-wrap rf-context-grid">
            <figure className="rf-tech-photo">
              <img
                src={`${asset}/tecnico.webp`}
                alt="Imagem ilustrativa de um técnico segurando a capa do Mapa Visual em uma oficina de refrigeração"
                width={1000}
                height={667}
                loading="lazy"
              />
              <figcaption>Imagem ilustrativa · material entregue em PDF</figcaption>
            </figure>
            <div>
              <p className="rf-kicker">
                <span /> CONSULTA EM CAMPO
              </p>
              <h2 id="campo">O ponto de partida quando o defeito não é óbvio.</h2>
              <p>
                Use as fichas para localizar peças, comparar sinais parecidos e registrar o que foi
                conferido. Códigos e valores específicos remetem ao manual do equipamento.
              </p>
              <a className="rf-text-link" href="#oferta">
                Ver o que vem no kit <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="bonus" className="rf-section rf-bonuses">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <p className="rf-kicker">
                <span /> INCLUÍDOS NO PLANO COMPLETO
              </p>
              <h2>10 bônus para usar no próximo chamado</h2>
              <p>Modelos de atendimento, rotinas de campo e materiais para imprimir.</p>
            </div>
            <div className="rf-bonus-grid">
              {bonuses.map(([title, description], index) => (
                <article className="rf-bonus-card" key={title}>
                  <div className="rf-bonus-art">
                    <img
                      src={`${asset}/bonus-${index + 1}.webp`}
                      alt={`Capa de ${title}`}
                      width={300}
                      height={424}
                      loading="lazy"
                    />
                  </div>
                  <div className="rf-bonus-text">
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
            <div className="rf-section-head rf-offer-head">
              <h2 id="titulo-oferta">Escolha seu plano</h2>
              <p>
                {usesCakto
                  ? "Escolha uma opção para receber o material em PDF."
                  : "Receba os PDFs pelo WhatsApp, confira o material e só depois pague."}
              </p>
            </div>
            <div className="rf-offer-grid">
              {plans.map((plan, index) => (
                <article
                  className={`rf-price-card${index === 1 ? " rf-price-complete" : ""}`}
                  key={plan.name}
                >
                  <div className="rf-price-heading">
                    <h3>Plano {plan.name}</h3>
                    {index === 1 && <span>6 cadernos + 10 bônus</span>}
                  </div>
                  <p className="rf-plan-description">{plan.description}</p>
                  <p className="rf-price-total">{plan.price}</p>
                  <p className="rf-pay-info">Pagamento único</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} aria-hidden="true" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <PlanButton plan={plan} />
                </article>
              ))}
            </div>
            {!canBuyBothPlans && (
              <p className="rf-contact-status">
                {usesCakto
                  ? "Alguns planos ainda estão sendo configurados."
                  : "As vendas serão disponibilizadas em breve."}
              </p>
            )}
          </div>
        </section>

        <section id="perguntas" className="rf-section rf-faq">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <h2>Dúvidas frequentes</h2>
            </div>
            <div className="rf-faq-list">
              {faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="rf-footer">
        <div className="rf-wrap">
          <span>
            <Snowflake size={20} aria-hidden="true" /> Mapa Visual do Técnico Refrigerista
          </span>
          <span>
            <Download size={17} aria-hidden="true" /> Material digital em PDF
          </span>
        </div>
      </footer>
    </div>
  );
}
