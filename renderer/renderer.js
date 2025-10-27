const inputEl = document.getElementById('input');
const runBtn = document.getElementById('runBtn');
const outputEl = document.getElementById('output');

runBtn.addEventListener('click', async () => {
  const userInput = inputEl.value;
  outputEl.textContent = 'Running…';
  const res = await window.api.runAgent(userInput);
  if (res.success) {
    outputEl.textContent = res.output;
  } else {
    outputEl.textContent = 'Error: ' + res.error;
  }
});
