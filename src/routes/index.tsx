import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  Expand,
  FileText,
  Menu,
  MessageCircle,
  Search,
  Smartphone,
  Snowflake,
  Wrench,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: RefrigeristaLanding });

const asset = "/images/refrigerista";
const contact = import.meta.env["VITE_WHATSAPP_NUMBER"]?.trim().replace(/\D/g, "");
const message = "Olá! Quero receber o Mapa Visual do Técnico Refrigerista por R$ 19,90.";
const whatsapp = /^55\d{10,11}$/.test(contact ?? "")
  ? `https://wa.me/${contact}?text=${encodeURIComponent(message)}`
  : null;

const cadernos = [
  {
    title: "Mapa Visual Geral",
    pages: 56,
    description:
      "Encontre a ficha pelo sintoma em geladeiras, freezers, splits, bebedouros, purificadores e câmaras frias.",
    sample: "Geladeira não gela",
  },
  {
    title: "Diagnóstico Split",
    pages: 41,
    description:
      "Organize as verificações quando o split gela pouco, pinga, forma gelo ou desliga sozinho.",
    sample: "Água na unidade interna",
  },
  {
    title: "Mapa Elétrico do Refrigerista",
    pages: 35,
    description:
      "Consulte 30 fichas de medição e interpretação para componentes como capacitores, sensores, relés e compressores.",
    sample: "Capacitância do capacitor permanente",
  },
  {
    title: "Vazamento, Vácuo e Carga",
    pages: 32,
    description:
      "Siga a investigação do primeiro indício de vazamento ao registro de estanqueidade, vácuo, carga por massa e conferência final.",
    sample: "Falta de fluido, restrição ou pouco ar?",
  },
  {
    title: "Diagnóstico Inverter na Prática",
    pages: 36,
    description:
      "Relacione alimentação, comando, comunicação e compressor em geladeiras e splits inverter.",
    sample: "Placa, comunicação ou compressor?",
  },
  {
    title: "Refrigeração Comercial",
    pages: 40,
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
    "O que eu recebo?",
    "São 6 cadernos técnicos e 10 bônus em PDF. O kit reúne 350 páginas de conteúdo, além das capas.",
  ],
  [
    "Como recebo e quando pago?",
    "Chame no WhatsApp. Você recebe os PDFs, abre e confere o material e só depois faz o pagamento único de R$ 19,90.",
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

function Cta({
  label = "Quero receber pelo WhatsApp",
  offer = false,
}: {
  label?: string;
  offer?: boolean;
}) {
  if (offer && !whatsapp) {
    return (
      <span className="rf-cta unavailable" aria-disabled="true">
        <MessageCircle size={20} /> WhatsApp em breve
      </span>
    );
  }

  return (
    <a
      className="rf-cta"
      href={whatsapp ?? "#oferta"}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
    >
      <MessageCircle size={20} aria-hidden="true" /> {whatsapp ? label : "Ver detalhes da oferta"}{" "}
      <ArrowRight className="cta-arrow" size={19} aria-hidden="true" />
    </a>
  );
}

function RefrigeristaLanding() {
  const [book, setBook] = useState(0);
  const [menu, setMenu] = useState(false);
  const current = cadernos[book] ?? cadernos[0]!;
  const moveBook = (direction: number) =>
    setBook((previous) => (previous + direction + cadernos.length) % cadernos.length);

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
            <a href="#cadernos" onClick={() => setMenu(false)}>
              Os cadernos
            </a>
            <a href="#bonus" onClick={() => setMenu(false)}>
              Bônus
            </a>
            <a href="#perguntas" onClick={() => setMenu(false)}>
              Dúvidas
            </a>
            <a className="rf-head-action" href="#oferta" onClick={() => setMenu(false)}>
              Ver oferta <ArrowRight size={15} />
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
                <Cta />
                <strong className="rf-hero-price">R$ 19,90</strong>
              </div>
              <p className="rf-hero-note">
                <Check size={16} aria-hidden="true" /> Receba os PDFs, confira e só depois pague.
              </p>
            </div>
            <figure
              className="rf-product"
              aria-label="Mockup dos cadernos e de uma ficha em um celular"
            >
              <div className="rf-product-grid" aria-hidden="true" />
              <span className="rf-product-label">
                <BookOpen size={14} /> COLEÇÃO DIGITAL
              </span>
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
          <div className="rf-wrap rf-stats" aria-label="Conteúdo da coleção">
            <div>
              <BookOpen />
              <span>
                <strong>6 cadernos técnicos</strong>
                <small>Diagnóstico doméstico e comercial</small>
              </span>
            </div>
            <div>
              <ClipboardList />
              <span>
                <strong>10 bônus práticos</strong>
                <small>Do orçamento à entrega técnica</small>
              </span>
            </div>
            <div>
              <Smartphone />
              <span>
                <strong>350 páginas de conteúdo</strong>
                <small>PDFs para celular e impressão A4</small>
              </span>
            </div>
          </div>
        </section>

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
              ].map(([Icon, title, text], index) => {
                const StepIcon = Icon as typeof Search;
                return (
                  <article key={String(title)}>
                    <span className="rf-step-icon">
                      <StepIcon size={22} aria-hidden="true" />
                    </span>
                    <span className="rf-step-no">0{index + 1}</span>
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cadernos" className="rf-section rf-cadernos">
          <div className="rf-wrap">
            <div className="rf-section-head">
              <p className="rf-kicker">
                <span /> POR DENTRO DA COLEÇÃO
              </p>
              <h2>Explore os seis cadernos</h2>
              <p>Selecione uma capa e veja uma ficha real de cada volume.</p>
            </div>
            <div className="rf-reader">
              <div className="rf-reader-art">
                <img
                  className="rf-reader-cover"
                  src={`${asset}/caderno-${book + 1}.webp`}
                  alt={`Capa de ${current.title}`}
                  width={420}
                  height={594}
                  loading="lazy"
                />
                <img
                  className="rf-reader-sheet"
                  src={`${asset}/ficha-${book + 1}.webp`}
                  alt={`Exemplo de ficha: ${current.sample}`}
                  width={650}
                  height={919}
                  loading="lazy"
                />
              </div>
              <div className="rf-reader-copy" aria-live="polite">
                <p className="rf-reader-label">CADERNO {String(book + 1).padStart(2, "0")} DE 06</p>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <span className="rf-reader-pages">
                  <FileText size={16} aria-hidden="true" /> {current.pages} páginas de conteúdo
                </span>
                <a
                  className="rf-sample-link"
                  href={`${asset}/ficha-${book + 1}.webp`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Expand size={16} aria-hidden="true" /> Ampliar ficha de exemplo
                </a>
                <div className="rf-reader-nav">
                  <button type="button" onClick={() => moveBook(-1)} aria-label="Caderno anterior">
                    <ArrowLeft size={21} />
                  </button>
                  <button type="button" onClick={() => moveBook(1)} aria-label="Próximo caderno">
                    <ArrowRight size={21} />
                  </button>
                </div>
              </div>
            </div>
            <div className="rf-thumbs" aria-label="Selecionar caderno">
              {cadernos.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setBook(index)}
                  aria-pressed={book === index}
                >
                  <img
                    src={`${asset}/caderno-${index + 1}.webp`}
                    alt=""
                    width={420}
                    height={594}
                    loading="lazy"
                  />
                  <span>{item.title}</span>
                </button>
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
                <span /> INCLUÍDOS NO KIT
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

        <section id="oferta" className="rf-section rf-offer">
          <div className="rf-wrap rf-offer-grid">
            <div>
              <p className="rf-kicker">
                <span /> ENVIO PELO WHATSAPP
              </p>
              <h2>Receba, confira e só depois pague.</h2>
              <ol className="rf-order">
                <li>
                  <span>1</span> Chame no WhatsApp e peça o Mapa Visual.
                </li>
                <li>
                  <span>2</span> Receba os PDFs e confira o conteúdo.
                </li>
                <li>
                  <span>3</span> Depois da conferência, faça o pagamento.
                </li>
              </ol>
            </div>
            <div className="rf-price-card">
              <p className="rf-price-title">Mapa Visual do Técnico Refrigerista</p>
              <p className="rf-price-total">R$ 19,90</p>
              <p className="rf-pay-info">Pagamento único</p>
              <ul>
                <li>
                  <Check /> 6 cadernos técnicos
                </li>
                <li>
                  <Check /> 10 bônus em PDF
                </li>
                <li>
                  <Check /> 350 páginas de conteúdo
                </li>
                <li>
                  <Check /> Entrega por WhatsApp
                </li>
              </ul>
              <Cta offer />
              {!whatsapp && (
                <p className="rf-contact-status">O canal de atendimento está em preparação.</p>
              )}
            </div>
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
