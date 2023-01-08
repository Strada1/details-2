import langHandle from '../CONTROLLER/handle';

const langSwitcher = () => {
  const langSwitch = document.querySelector(
    '.main_info-section_locations-lang',
  );
  langSwitch.addEventListener('click', langHandle);
};

export default langSwitcher;
