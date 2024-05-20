// helper functions getting news
import { DUMMY_NEWS } from '@/dummy-news';

export function getAllNews() {
  return DUMMY_NEWS;
}

export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() {
  return DUMMY_NEWS.reduce((years, news) => {
    const dateString = news.date + 'T00:00:00Z'; // ensure it's in proper ISO 8601
    const year = new Date(dateString).getUTCFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year) {
  return DUMMY_NEWS.reduce((months, news) => {
    const newsYear = new Date(news.date).getUTCFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getUTCMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => a - b);
}

export function getNewsForYear(year) {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getUTCFullYear() === +year
  );
}

export function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getUTCFullYear();
    const newsMonth = new Date(news.date).getUTCMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
