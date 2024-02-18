function checkScrollToEnd(e) {
  const target = e.target;
  const top = target.scrollTop;
  const height = target.scrollHeight;
  const diff = Math.floor(height - top);
  const clientHeight = target.clientHeight;
  return diff <= clientHeight;
}

export default checkScrollToEnd;
