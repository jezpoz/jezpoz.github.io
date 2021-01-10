import sanityClient from '../../source/sanity';

export async function get(req, res) {
  try {
		const posts = await sanityClient.fetch('*[_type == "post"]{title, slug}');
    if (posts) {
      res.writeHead(200);
      res.end(JSON.stringify(posts));
      return;
    }
    res.writeHead(404);
		res.end(JSON.stringify({
			message: 'No posts found',
		}));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({
      message: 'Something went wrong, we\'re sorry. :c'
    }))
  }
}