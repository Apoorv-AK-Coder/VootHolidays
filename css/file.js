setInterval(mufun, 1000);
function mufun() {
  let b1 = document.getElementById("on");
  let b2 = document.getElementById("off");
  let view = document.getElementById("view");

  b1.addEventListener("click", function () {
    if ((view.style.display = "none")) {
      view.style.display = "block";

    }
  })

  b2.addEventListener("click", function () {
    if ((view.style.display = "block")) {
      view.style.display = "none";
    }
  })
}

const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll(".navigate nav ul li a");
navLinks.forEach(link => {
  const linkPath = new URL(link.href).pathname;
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

document.querySelectorAll('.faqhead').forEach(head => {
  head.addEventListener('click', () => {
    const detail = head.nextElementSibling;
    const plusIcon = head.querySelector('.fa-angle-down');
    const minusIcon = head.querySelector('.fa-angle-up');

    detail.classList.toggle('show');
    if (detail.classList.contains('show')) {
      plusIcon.style.display = 'none';
      minusIcon.style.display = 'inline';
    } else {
      plusIcon.style.display = 'inline';
      minusIcon.style.display = 'none';
    }
  });
});

function openTab(index) {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  panels.forEach(panel => panel.classList.remove('active'));

  tabs[index].classList.add('active');
  panels[index].classList.add('active');
}