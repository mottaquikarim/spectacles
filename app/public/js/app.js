(() => { // protect the lemmings!

	const parseParams = () => {
		const hashstr = window.location.search.substr(1);
		const hasharr = hashstr.split('&')
		return hasharr.reduce((hash, arg) => {
		    const bits = arg.split('=')
		    hash[bits[0]] = bits[1]
		    return hash;
		}, {});
	};

    const Ajax = {
        get(url) {
            return new Promise((res, rej) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = e => res(JSON.parse(e.target.response))
                xhr.send();
            });
        },
        post() {},
    };

    const run = () => {
        const {uuid} = parseParams();
        if (!uuid) {
            alert("No UUID present");
        }

        if (document.body.classList.contains('js-tests-runner')) {

            if (localStorage.getItem(uuid)) {
                const data = JSON.parse(localStorage.getItem(uuid));
                eval(data['prompt.js'] + '\n' + data['tests.js']);
                mocha.checkLeaks();
                mocha.run();
            }
            else {
                alert("no tests found!")
            }

            return;
        }

        Ajax.get(`/content/${uuid}`)
            .then(d => {
                console.log(d);
                const app = document.querySelector('.js-app')
                app.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-primary navbar--slim navbar--over">
  <a class="navbar-brand" href="#">
    spectacles <span style="display: none; font-size: 10px;" class="js-label">(changes saved locally)</span>
  </a>
  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto justify-content-end">
    </ul>

    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Save</a>
      </li>
      <li class="nav-item">
        <a class="nav-link js-run" href="#">Run</a>
      </li>
    </ul>
  </div>
</nav>
<div class="js-tests app hidden"></div>
<div class="third-col" id="prompt-js" data-type="ace/mode/javascript"></div>
<div id="tests-js" class="third-col" data-type="ace/mode/javascript"></div>
<div id="background-md" class="third-col" data-type="ace/mode/markdown"></div>
                `;

                app.classList.add('loaded')

                const changes = document.querySelector('.js-label');

                const editors = Object.keys(d).map(key => {
                    const keyId = key.replace(/\./g, '-');
                    const editor = ace.edit(keyId);
                    const dom = document.querySelector(`#${keyId}`)

                    editor.setTheme("ace/theme/monokai");
                    editor.session.setMode(dom.getAttribute('data-type'));
                    editor.session.setUseWrapMode(true);

                    if (localStorage.getItem(uuid)) {
                        const data = JSON.parse(localStorage.getItem(uuid));
                        editor.session.setValue(data[key]);
                    }
                    else {
                        editor.session.setValue(d[key]);
                        localStorage.setItem(uuid, JSON.stringify(d));
                    }

                    editor.session.on('change', delta => {
                        const data = JSON.parse(localStorage.getItem(uuid));
                        data[key] = editor.getValue();
                        console.log(data[key])
                        localStorage.setItem(uuid, JSON.stringify(data));

                        const timeNow = new Date().toString().split(' ').slice(0,5).join(" ")

                        changes.style.display = "inline";
                        changes.innerHTML = `(changes saved locally at ${timeNow})`
                    });

                    return editor;
                });

                const run = document.querySelector('.js-run')
                const tests = document.querySelector('.js-tests')
                run.addEventListener('click', e => {
                    e.preventDefault();
                    if (tests.classList.contains('hidden')) {
                        run.innerHTML = `Close`;
                        tests.classList.remove('hidden')
                        tests.innerHTML = `<iframe src="tests.html?uuid=${uuid}" style="width: 100%; height: 100%; border: 0px solid transparent;"></iframe>`
                    }
                    else {
                        run.innerHTML = `Run`;
                        tests.classList.add('hidden')
                    }
                });
            });
    };

    run();

})();
