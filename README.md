# Forum

## Resumo

O sistema providencia um ambiente para a discussão entre membros de uma comunidade.
O projeto é divido em duas frentes: um cliente e um servidor. Veja a documentação `README.md` de cada um para executar localmente.

## Requisitos

1. Um usuário deve conter: id, nome, email, senha, imagem e data de criação.

   - Os campos id e email devem ser únicos.
   - A senha deve ser criptografada.

2. O sistema deve possuir controle de autenticação.

3. O sistema deve possuir controle de autorização.

   - A cada usuário no sistema deve ser associado permissões, as quais podem ser agrupadas em papéis.
   - O sistema deve suportar dois tipos de usuários: membros e administradores.
   - Aos membros deve ser permitida a manutenção de contribuições – postagens e
     comentários – bem como o ranqueamento das mesmas. Além do devido gerenciamento de sua própria conta.
   - Os administradores estendem as permissões dos membros, com o acréscimo do controle da categorização
     de postagens e gerenciamento de usuários e permissões.
   - Um papel ou permissão deve conter: nome (único), descrição e data de criação.

4. O sistema deve armazenar as contribuições de usuários. Uma postagem deve conter:
   id, autoria, título, conteúdo, categorias, comentários e datas (criação, última atualização).

   - Uma categoria deve conter: nome (único), descrição, cor e data de criação.
   - Um comentário deve conter: identificador, autoria, conteúdo e datas (criação, última atualização).
     Um comentário pode referenciar outro como uma resposta.

5. As contribuições devem ser sujeitas a ranqueamentos pelos membros da comunidade.

   - O sistema deve permitir votos positivos e negativos.
   - Um usuário pode participar uma única vez no ranqueamento de uma contribuição, votando exclusivamente a favor ou contra.
