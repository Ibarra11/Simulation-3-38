SELECT * 
FROM users, posts
WHERE users.id = posts.author_id  AND posts.author_id != $1 AND title=$2;