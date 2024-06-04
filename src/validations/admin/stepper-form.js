import Yup from "../yup"

export const stepperValidation = Yup.object().shape({


    // step 1

    name : Yup.string().min(3, 'isim alanı en az 3 karakter olmalı').max(20, 'isim alanı en fazla 20 karakter olabilir').when('step', {
        is: 1,
        then: schema => schema.required()
    }),

    description : Yup.string().max(200, 'Açıklama alanı en fazla 200 karakter olabilir').min(15, 'Açıklama alanı en az 15 karakter olmalı').when('step', {
        is: 1,
        then: schema => schema.required()
    }),

    logo : Yup.mixed().test('fileFormat', 'Geçersiz dosya uzantısı', value => {

        if (value) {
            const supportedFormats = ["jpg","jpeg","png","JPG", "JPEG", "PNG"];
            return supportedFormats.includes(value.name.split('.').pop());
        }
        return true;

      }).test('fileSize', 'Dosya boyutu en fazle 5 mb olabilir', value => {

        if (value) {

          return value.size <= 5245728;
          
        }
        return true;

      }).when('step', {
        is: 1,
        then: schema => schema.required()
    }),

     capacity : Yup.number().min(5).when('step', {
         is: 1,
         then: schema => schema.required()
     }),

     selfService : Yup.boolean().when('step', {
         is: 1,
         then: schema => schema.required()
     }),

     wifi : Yup.boolean().when('step', {
         is: 1,
         then: schema => schema.required()
     }),

     liveMusic : Yup.boolean().when('step', {
         is: 1,
         then: schema => schema.required()
     }),

     alcohol : Yup.boolean().when('step', {
         is: 1,
         then: schema => schema.required()
     }),

     balcony : Yup.boolean().when('step', {
         is: 1,
         then: schema => schema.required()
     }),


     // step 2


    city : Yup.string().when('step', {
        is: 2,
        then: schema => schema.required()
    }),

    district : Yup.string().when('step', {
        is: 2,
        then: schema => schema.required()
    }),

    adressDesc : Yup.string().max(200).min(15, 'adres alanı en az 15 karakter olmalı').when('step', {
        is: 2,
        then: schema => schema.required()
    }),


    // step 3

    menu: Yup.array().when('step', {
        is: 3,
        then: schema => schema.required('En az 3 Yiyecek eklemelisiniz').min(3, 'En az 3 Yiyecek eklemelisiniz')
    }),

    // step 4

    gallery : Yup.array().when('step', {
        is: 4,
        then: schema => schema.required('En az 3 fotoğraf eklemelisiniz').min(3)
    }).of(
        Yup.mixed().test('fileFormat', 'Geçersiz dosya uzantısı', value => {

            if (value) {
                const supportedFormats = ["png","PNG","jpg", "JPEG", "JPG", "jpeg"];
                return supportedFormats.includes(value.name.split('.').pop());
            }
            return true;
    
          }).test('fileSize', 'Dosya boyutu en fazle 5 mb olabilir', value => {
    
            if (value) {
              return value.size <= 5145728;
            }
            return true;
    
          }).when('step', {
            is: 4,
            then: schema => schema.required()
        }),
    ),

    //  food: Yup.string()

    // category : Yup.string().when(['menu', 'step'],{
    //     is: (menu, step) => menu.length < 3 && step == 3,
    //     then: Yup.string().required('Kategori zorunludur'),
    //     otherwise: Yup.string().notRequired(),
    // }),
    // price : Yup.string().when(['menu', 'step'],{
    //     is: (menu, step) => menu.length < 3 && step == 3,
    //     then: Yup.string().required('Fiyat zorunludur'),
    //     otherwise: Yup.string().notRequired(),
    // }),
    


})