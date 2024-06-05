const dayOfWeek: {
    [key: string]: string[],
} = {
    vi: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
}

function useFormatDateTime (date: Date, lang: string) {
    const dateTime = new Date(date);
    const weekday = dayOfWeek[lang][dateTime.getDay()]
    const day = dateTime.toLocaleString(lang, { day: '2-digit' });
    const month = dateTime.toLocaleString(lang, { month: '2-digit' });
    const dateFormat = `${day}/${month}(${weekday})`;

    return dateFormat;
}

export default useFormatDateTime;