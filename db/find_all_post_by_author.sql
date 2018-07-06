SELECT * 
FROM users, posts
WHERE users.id = posts.author_id  AND title=$1;
