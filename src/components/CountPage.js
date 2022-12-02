const CountPage = (action, page, total, setPage) => {
  if (action === 'increase' && page < total) {
      setPage(page + 1);
  } else if (action === 'decrease' && page > 1) {
      setPage(page - 1);
  };
};

export default CountPage;
