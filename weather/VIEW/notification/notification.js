import { createElementWithClassname } from '../../CONTROLLER/helpers';

const removeField = () => {
  const notificationField = document.querySelector('.notification');
  if (notificationField) {
    notificationField.remove();
  }
};

const drawError = (errorMSG) => {
  let errorMain = document.querySelector('.notification');
  if (!errorMain) {
    errorMain = createElementWithClassname('div', 'notification');
  }
  document.body.append(errorMain);
  const errorText = document.createElement('h1');
  errorText.textContent = errorMSG;
  errorMain.append(errorText);
  setTimeout(() => {
    errorText.remove();
    removeField();
  }, 3000);
};

export default drawError;
