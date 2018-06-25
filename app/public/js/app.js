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

        Ajax.get(`/content/${uuid}`)
            .then(d => {
                console.log(d);
                const app = document.querySelector('.js-app')
                app.innerHTML = `
<div id="prompt-js" class="third-col" data-type="ace/mode/javascript"></div>
<div id="tests-js" class="third-col" data-type="ace/mode/javascript"></div>
<div id="background-md" class="third-col" data-type="ace/mode/markdown"></div>
                `;

                app.classList.add('loaded')

                const editors = Object.keys(d).map(key => {
                    const keyId = key.replace(/\./g, '-');
                    const editor = ace.edit(keyId);
                    const dom = document.querySelector(`#${keyId}`)

                    editor.setTheme("ace/theme/monokai");
                    editor.session.setMode(dom.getAttribute('data-type'));
                    editor.session.setUseWrapMode(true);

                    if (localStorage.getItem(uuid)) {
                        const data = JSON.parse(localStorage.getItem(uuid)); editor.session.setValue(data[key]);
                    }
                    else {
                        editor.session.setValue(d[key]);
                        localStorage.setItem(uuid, JSON.stringify(d));
                    }

                    editor.session.on('change', delta => {
                        d[key] = editor.getValue();
                        localStorage.setItem(uuid, JSON.stringify(d));
                    });

                    return editor;
                });
            });
    };

    run();

})();
