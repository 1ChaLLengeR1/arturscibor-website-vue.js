.PHONY: install dev build serve preview clean vault_decrypt vault_encrypt vault_view

install:
	npm install

dev:
	npm run dev

build:
	npm run build

serve:
	npm run serve

preview:
	npm run preview

clean:
	rm -rf node_modules dist

# ── ansible-vault (infra/ansible/secrets.yml) ────────────────────────────────
# Uzycie: ANSIBLE_PASSWORD='haslo' make vault_decrypt|vault_encrypt|vault_view

vault_decrypt:
	@bash infra/scripts/vault.sh decrypt

vault_encrypt:
	@bash infra/scripts/vault.sh encrypt

vault_view:
	@bash infra/scripts/vault.sh view
