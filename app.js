//teste2
document.addEventListener('DOMContentLoaded', () => {
    // Funções para carregar, adicionar, atualizar e excluir itens
    function loadItems() {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                const itemList = document.getElementById('itemList');
                itemList.innerHTML = '';

                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-id', item.id);

                    listItem.innerHTML = `
              <span>${item.name}</span>
              <button class="editBtn">Edit</button>
              <button class="deleteBtn">Delete</button>
            `;

                    itemList.appendChild(listItem);
                });
            });
    }

    function addItem(name) {
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then(response => response.json())
            .then(() => {
                loadItems();
            });
    }

    function updateItem(id, name) {
        fetch(`/api/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then(response => response.json())
            .then(() => {
                loadItems();
            });
    }

    function deleteItem(id) {
        fetch(`/api/data/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                loadItems();
            });
    }

    // Evento de envio do formulário
    document.getElementById('itemForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemId = document.querySelector('#itemList li.active')?.getAttribute('data-id');

        if (itemId) {
            updateItem(itemId, itemName);
        } else {
            addItem(itemName);
        }

        document.getElementById('itemName').value = '';
    });

    // Evento de clique nos botões de edição e exclusão
    document.getElementById('itemList').addEventListener('click', (e) => {
        const listItem = e.target.closest('li');
        if (!listItem) return;

        const itemName = listItem.querySelector('span').innerText;
        const itemId = listItem.getAttribute('data-id');

        if (e.target.classList.contains('editBtn')) {
            document.getElementById('itemName').value = itemName;
            document.querySelectorAll('#itemList li').forEach(item => item.classList.remove('active'));
            listItem.classList.add('active');
        } else if (e.target.classList.contains('deleteBtn')) {
            deleteItem(itemId);
        }
    });

    // Carregar itens iniciais
    loadItems();
});
