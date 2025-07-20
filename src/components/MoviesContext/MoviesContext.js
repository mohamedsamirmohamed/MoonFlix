// استيراد الحزم اللازمة من React
import React, { createContext, useContext, useEffect, useState } from 'react';
// استيراد مكتبة axios لعمل الطلبات الخارجية (API)
import axios from 'axios';

// إنشاء السياق الخاص بالأفلام
const MoviesContext = createContext();

// إنشاء المزوّد (Provider) الخاص بالسياق
export const MoviesProvider = ({ children }) => {
  // مفتاح API الخاص بـ TMDB
  const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';

  // حالة لتخزين الأفلام الشهيرة
  const [popularMovies, setPopularMovies] = useState([]);
  // حالة لتخزين الأفلام الأعلى تقييماً
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // حالة لمعرفة إذا كانت البيانات لا زالت قيد التحميل
  const [loading, setLoading] = useState(true);

  // دالة لجلب الأفلام الشهيرة (Popular Movies)
  const fetchPopularMovies = async () => {
    try {
      // مصفوفة لتجميع جميع الأفلام من عدة صفحات
      let allMovies = [];
      // عدد الصفحات اللي هنجلب منها بيانات
      const totalPagesToFetch = 5;
      // حلقة تمر على كل صفحة وتجلب البيانات
      for (let page = 1; page <= totalPagesToFetch; page++) {
        // طلب البيانات من API الخاص بالأفلام الشهيرة
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        // دمج النتائج مع المصفوفة الأساسية
        allMovies = allMovies.concat(response.data.results);
      }
      // تخزين جميع الأفلام الشهيرة في الحالة
      setPopularMovies(allMovies);
    } catch (error) {
      // طباعة الخطأ في حالة فشل الطلب
      console.error('Error fetching popular movies:', error);
    }
  };

  // دالة لجلب الأفلام الأعلى تقييماً (Top Rated Movies)
  const fetchTopRatedMovies = async () => {
    try {
      // مصفوفة لتجميع جميع الأفلام من عدة صفحات
      let allMovies = [];
      // عدد الصفحات اللي هنجلب منها بيانات
      const totalPagesToFetch = 5;
      // حلقة تمر على كل صفحة وتجلب البيانات
      for (let page = 1; page <= totalPagesToFetch; page++) {
        // طلب البيانات من API الخاص بالأفلام الأعلى تقييماً
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
        );
        // دمج النتائج مع المصفوفة الأساسية
        allMovies = allMovies.concat(response.data.results);
      }
      // تخزين جميع الأفلام الأعلى تقييماً في الحالة
      setTopRatedMovies(allMovies);
    } catch (error) {
      // طباعة الخطأ في حالة فشل الطلب
      console.error('Error fetching top rated movies:', error);
    }
  };

  // استخدام useEffect لتشغيل جلب البيانات عند تحميل الصفحة لأول مرة
  useEffect(() => {
    // دالة داخلية لجلب جميع البيانات دفعة واحدة
    const fetchAll = async () => {
      // جعل حالة التحميل true قبل البدء
      setLoading(true);
      // جلب بيانات الأفلام الشهيرة والأعلى تقييماً معًا
      await Promise.all([fetchPopularMovies(), fetchTopRatedMovies()]);
      // جعل حالة التحميل false بعد الانتهاء
      setLoading(false);
    };

    // استدعاء دالة جلب البيانات
    fetchAll();
  }, []); // [] تعني إن الدالة تتنفذ مرة واحدة فقط عند التحميل

  // توفير البيانات المُجمعة داخل السياق ليستفيد منها باقي المكونات
  return (
    <MoviesContext.Provider value={{ popularMovies, topRatedMovies, loading }}>
      {children}
    </MoviesContext.Provider>
  );
};

// هوك مخصص لاستخدام بيانات الأفلام بسهولة داخل أي مكون
export const useMovies = () => useContext(MoviesContext);
