
const styleSheet = `
.cookie-consent-modal {
  /* Vars */
  --background: #4e4e4e;
  --link-color: #79cbf2;
  --link-color-hover: #17e4ff;
  --body-text-color: #fff;
  --button-background: #fff;

  box-shadow:0 0 10px rgba(0,0,0,.4) !important;
  position:fixed !important;
  bottom:0 !important;
  margin-bottom:4.5rem !important;
  z-index:10000 !important;
  width: 100vw !important;
  max-width: 100% !important;
  color:var(--body-text-color) !important;
  background:var(--background) !important;
  padding:2.5rem 0 !important;
  border: 0 !important;
}
.cookie-consent-modal p{
  width:inherit !important;
  margin:auto !important
}
.cookie-consent-modal a{
  color:var(--link-color) !important;
  text-decoration: none !important;
}
.cookie-consent-modal a:focus,.cookie-consent-modal a:hover{
  text-decoration:underline !important;
}
.cookie-consent-modal button{
  cursor: pointer !important;
  margin:1rem auto 0 !important;
  display:block !important;
  font-weight:700 !important;
  color:var(--background) !important;
  background-color:var(--button-background) !important;
  border: 0 !important;
  padding: 8px 14px !important;
  border-radius:4px !important;
}
.cookie-consent-modal button:active,.cookie-consent-modal button:focus,.cookie-consent-modal button:hover{
  background-color:var(--link-color) !important;
}
.cookie-consent-modal > .container {
  margin:auto !important;
  max-width:100% !important;
  padding: 0 1.5em !important;
}
`;

const breakpoints = `
@media (min-width: 556px) {
  .cookie-consent-modal > .container {
    max-width:540px !important;
    padding: 0 !important;
  }
}
@media (min-width: 768px) {
  .cookie-consent-modal > .container {
    max-width:720px !important;
  }
}
@media (min-width: 992px) {
  .cookie-consent-modal > .container {
    max-width:960px !important;
  }
}
@media (min-width: 1200px) {
  .cookie-consent-modal > .container {
    max-width:1140px !important;
  }
}`;

const modalStrings = {
  body: `Nós usamos cookies para melhorar sua experiência de navegação no portal.
        Ao utilizar o %sitename%, você concorda com a política de monitoramento de cookies.
        Para ter mais informações sobre como isso é feito e como remover, acesse a %cookie-policy%.
        Para saber como a UFRN trata os dados, acesse a %privacy-policy%. Se você concorda, clique em %button-text%.`,
  button: "Ciente"
}

const elements = {
  'privacy-policy':'<a href="https://ufrn.br/institucional/politica-de-privacidade-e-termos-de-uso" target="_blank"> Política de Privacidade</a>',
  'cookie-policy': '<a href="https://ufrn.br/institucional/politica-de-cookies" target="blank" target="_blank"> Política de cookies</a>',
}



function cookieConsent(consentOption) {
  // Opções para futuras implementações de dados do momento em que o usuário aceitou os termos.
  const option = {
    option_date: (new Date).toLocaleDateString(),
    consent_options: []
  }
  localStorage.setItem(consentOption, JSON.stringify(option));
  // Desativando o modal
  document.getElementById(consentOption).removeAttribute("open");
}

/* Essa é a função que deve ser chamada na raiz do projeto. */
function generateCookieConsentModal(site_name, style = { },containerStyle = { }, responsive = true) {
  // Nomeando os dados que irão para o localStorage
  const consentOption = site_name.replaceAll(" ", "-").toLowerCase()+'-cookie-consent';
  if (localStorage.getItem(consentOption) == null)
  {

    /* Carregando a estilização */
    const styleTag = document.createElement("style");
    // Se for tamanho estático, adicione somente a largura (manual), senão, adicione um bloco responsivo
    styleTag.innerHTML = 
      responsive ? styleSheet + breakpoints
      : styleSheet;
    document.head.appendChild(styleTag);

    /* Criando o modal */
    const modal = document.createElement('dialog');
    modal.setAttribute("open", true);
    modal.classList.add('cookie-consent-modal');
    modal.id = consentOption;
    try {
      Object.assign(modal.style, style);
    } catch (e) {
      console.log(e);
    }
    

    const modalBody = document.createElement('div');
    modalBody.classList.add("container");
    try {
      Object.assign(modalBody.style, containerStyle)
    } catch (e) {
      console.log(e)
    }


    /* Formatando a string com o conteúdo do modal */
    modalBody.innerHTML = modalStrings.body
                        .replace("%sitename%", site_name)
                        .replace("%cookie-policy%", elements["cookie-policy"])
                        .replace("%privacy-policy%", elements["privacy-policy"])
                        .replace("%button-text%", modalStrings.button)

    /* Criando o botão */
    const consentButton = document.createElement('button');
    consentButton.innerText = "Ciente";
    consentButton.classList.add('btn', 'btn-primary');
    
    // Comportamento do botão
    consentButton.addEventListener("click", function() {
      cookieConsent(consentOption);
    });


    // Adicionando o modal a página
    modal.append(modalBody);
    modal.append(consentButton);

    document.body.prepend(modal);

  }
}