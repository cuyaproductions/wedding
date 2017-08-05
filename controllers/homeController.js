function index(request, response) {
  response.render('index', { ...request.content, className: 'index' });
}

export default {
  index,
};