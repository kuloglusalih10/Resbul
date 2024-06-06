import Yup from "../yup"

export const editCompValidation = Yup.object().shape({

    name : Yup.string().required().min(3, 'isim alanı en az 3 karakter olmalı').max(20, 'isim alanı en fazla 20 karakter olabilir'),

    description : Yup.string().required().max(400, 'Açıklama alanı en fazla 200 karakter olabilir').min(15, 'Açıklama alanı en az 15 karakter olmalı'),

    logo : Yup.mixed().nullable().test('fileFormat', 'Geçersiz dosya uzantısı', value => {

        if (value) {
            const supportedFormats = ["jpg","jpeg","JPG", "JPEG",];
            return supportedFormats.includes(value.name.split('.').pop());
        }
        return true;

      }).test('fileSize', 'Dosya boyutu en fazle 5 mb olabilir', value => {

        if (value) {

          return value.size <= 5245728;
          
        }
        return true;

      }),

     capacity : Yup.number().min(5).required(),

     selfService : Yup.boolean().required(),

     wifi : Yup.boolean().required(),

     liveMusic : Yup.boolean().required(),

     alcohol : Yup.boolean().required(),

     balcony : Yup.boolean().required(),



     city : Yup.string().required(),

     district : Yup.string().required(),

     adressDesc : Yup.string().max(200).min(15, 'adres alanı en az 15 karakter olmalı'),


     menu: Yup.array().required().min(3, "En az 3 yiyecek eklemelisiniz"),

    gallery : Yup.array().nullable().of(
        Yup.mixed().test('fileFormat', 'Geçersiz dosya uzantısı', value => {

            if (value) {
                const supportedFormats = ["jpg", "JPEG", "JPG", "jpeg"];
                return supportedFormats.includes(value.name.split('.').pop());
            }
            return true;

        }).test('fileSize', 'Dosya boyutu en fazle 5 mb olabilir', value => {

            if (value) {
            return value.size <= 5145728;
            }
            return true;

        })
    ),
    


})