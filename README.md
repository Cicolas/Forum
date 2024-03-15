# Forum

## Overview

The system provides an environment for discussion threads between community members.

## Requirements

1. A user must contain: id, name, email, password, image and date of creation

   - Id and email must be unique
   - Password must be encrypted

2. The system must have authentication

3. The system must have authorization

   - Each user in the system must be associated with permissions, which can be grouped into roles
   - The system must support two types of users: members and administrators
   - Members can create and rank contributions – posts and comments. In addition to manage your own account
   - Administrators can create roles, permissions and categories
   - A role/permission must contain: name (unique), description and date of creation

4. The system must store user contributions

   - A contribution must be accessible to any user on the system, even without being authenticated
   - A post must contain: id, author, title, content, categories, comments and dates (creation, last update)
   - A category must contain: name (unique), description, color and date of creation
   - A comment must contain: id, author, content and dates (creation, last update)
   - A comment can reference another as an answer

5. Contributions can be ranked by community

   - A ranking can be either positive or negative
   - A user can only participate once
