(() => {
  const openBtn = document.getElementById('axiom-open');
  const modal = document.getElementById('axiom-modal');
  const closeBtn = document.getElementById('axiom-close');
  const sendBtn = document.getElementById('axiom-send');
  const input = document.getElementById('axiom-input');
  const messages = document.getElementById('axiom-messages');

  function addMessage(text, from='bot') {
    const el = document.createElement('div');
    el.style.margin = '8px 0';
    el.style.padding = '10px';
    el.style.borderRadius = '8px';
    el.style.maxWidth = '85%';
    if(from === 'user') {
      el.style.background = '#e6f0ff';
      el.style.marginLeft = 'auto';
      el.innerText = text;
    } else {
      el.style.background = '#fff';
      el.style.border = '1px solid #eee';
      el.innerText = text;
    }
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    input.focus();
    if(!sessionStorage.getItem('axiom_greeted')) {
      addMessage('Olá! Eu sou o Axiom. Descreva brevemente o problema de segurança que deseja analisar.', 'bot');
      sessionStorage.setItem('axiom_greeted','1');
    }
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');

  async function send() {
    const text = input.value.trim();
    if(!text) return;
    addMessage(text, 'user');
    input.value = '';
    addMessage('Analisando...', 'bot');
    setTimeout(() => {
      messages.lastChild.innerText = 'Sou apenas um simulador offline por enquanto 😅. Depois você poderá integrar aqui a IA Axiom real.';
    }, 1200);
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') send(); });
})();
