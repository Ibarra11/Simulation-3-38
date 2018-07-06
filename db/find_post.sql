SELECT * 
FROM users, posts
WHERE users.id = posts.author_id AND posts.id = $1;
