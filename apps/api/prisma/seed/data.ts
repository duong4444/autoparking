import { generateSlots } from './util'
import { Prisma } from '@prisma/client'

export const garagesSample: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Khương Đình Garage 1',
    description: 'Secure parking in the heart of Khương Đình',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-parking-garage-in-brooklyn-new-york-the-picture-should-featu-561631306_qir7we.jpg',
      ],
    },

    Address: {
      create: {
        address: '172 Đ.Khương Đình',
        lat: 20.994037,
        lng: 105.813874,
      },
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
  },
]
export const garages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Khương Trung Garage 1',
    description: 'Affordable parking in Khương Trung',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-and-clean-parking-garage-in-brooklyn-new-york-the-picture-sh-825512221_kzvig6.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Khương Trung, Thanh Xuân, Hà Nội',
        lat: 20.993443, 
        lng:105.815186,
      },
    },
  },
  {
    displayName: 'Thái Hà Garage 1',
    description: 'Convenient parking in Thái Hà',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--976407210_la43y2.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Thái Hà, Trung Liệt, Đống Đa, Hà Nội',
        lat: 21.010290,
        lng: 105.823393,
      },
    },
  },
  {
    displayName: 'Quang Trung Garage 2',
    description: 'Secure parking near Quang Trung',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--639233464_tuskex.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),

        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Quang Trung, Đống Đa, HN',
        lat: 21.009412, 
        lng: 105.826927,
      },
    },
  },
  {
    displayName: 'Phố Vọng Garage 2',
    description: 'Spacious parking in Phố Vọng',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--184920453_v8umyi.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Phố Vọng, HBT, HN',
        lat: 20.999069, 
        lng: 105.842090,
      },
    },
  },
  {
    displayName: 'Phố Vọng Garage 2',
    description: 'Safe parking in Phố Vọng',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-a-spacious-parking-garage-in-brooklyn-heights-new-york-the-picture-should--539597916_obi5kl.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: '41/69 Phố Vọng, Đồng Tâm, HBT, HN',
        lat: 20.998137, 
        lng: 105.843235,
      },
    },
  },
  {
    displayName: 'Cát Linh Garage',
    description: 'Parking near Cát Linh',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--110448605_bqjzmf.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
      ],
    },
    Address: {
      create: {
        address: '35/64 P.Cát Linh, Đống Đa, HN',
        lat: 21.028416, 
        lng: 105.827974,
      },
    },
  },
  {
    displayName: 'Hàng Bột Garage ',
    description: 'Secure parking in Hàng Bột',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/render-a-cover-picture-of-a-secure-parking-garage-near-central-park-in-manhattan-new-york-the-imag-736153979_kvpczt.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Hàng Bột, Đống Đa, HN',
        lat: 21.023818, 
        lng: 105.835262,
      },
    },
  },
  {
    displayName: 'Đội Cấn Garage',
    description: 'Affordable parking in Đội Cấn',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-an-affordable-clean-outdoor-parking-garage-in-brooklyn-new-york-the-pict-620611113_ortr3g.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Đội Cấn, Ba Đình, HN',
        lat: 21.033856, 
        lng: 105.825287,
      },
    },
  },
  {
    displayName: 'Thổ Quan Garage 4',
    description: 'Parking near Thổ Quan',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158769/autospace/busy-parking-garage-with-slots-in-newyork-neon-ambiance-abstract-black-oil-gear-mecha-detailed-a_fy51wa.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),

        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Thổ Quan, Đống Đa, HN',
        lat: 21.018529, 
        lng: 105.835680,
      },
    },
  },
  {
    displayName: 'Yết Kiêu Garage 4',
    description: 'Parking near Yết Kiêu',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-haze-ultra-detail_n1hhhz.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: '44 P.Yết Kiêu',
        lat: 21.021548, 
        lng: 105.842071,
      },
    },
  },
  {
    displayName: 'Khâm Thiên Garage 4',
    description: 'Parking near Khâm Thiên',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-car-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-photogr_kst6l1.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Khâm Thiên, Đống Đa, HN',
        lat: 21.017261,
        lng:  105.837650,
      },
    },
  },
  {
    displayName: 'Giảng Võ Garage 5',
    description: 'Secure parking in Giảng Võ',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette-790070610_pptabc.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Giảng Võ, Ba Đình, HN',
        lat: 21.024929, 
        lng: 105.816628,
      },
    },
  },
  {
    displayName: 'Liễu Giai Garage 5',
    description: 'Parking in Liễu Giai',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-phot_ywuzvl.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Liễu Giai, Ba Đình, HN',
        lat: 21.041031, 
        lng: 105.818860,
      },
    },
  },
  {
    displayName: 'CỬA ĐÔNG Garage 5',
    description: 'Convenient parking in CỬA ĐÔNG',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometri_lai3r3.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),

        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'CỬA ĐÔNG, HOÀN KIẾM, HN',
        lat: 21.031115,
        lng:  105.844948,
      },
    },
  },
  {
    displayName: 'LÁNG HẠ Garage 6',
    description: 'Parking in LÁNG HẠ',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art_rfgxgp.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'HEAVY',
        }),
      ],
    },
    Address: {
      create: {
        address: 'LÁNG HẠ, ĐỐNG ĐA, HN',
        lat: 21.016156, 
        lng: 105.807998,
      },
    },
  },
  {
    displayName: 'CỐNG VỊ Garage 6',
    description: 'Parking in CỐNG VỊ',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-in-the-hudson-river-low-poly-isometric-art-3d-art-high_os8c09.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'CAR',
        }),
        ...generateSlots({
          type: 'HEAVY',
        }),
      ],
    },
    Address: {
      create: {
        address: 'CỐNG VỊ, BA ĐÌNH, HN',
        lat:21.036259, 
        lng: 105.813000,
      },
    },
  },
  {
    displayName: 'PHÚC XÁ Garage 6',
    description: 'Parking in PHÚC XÁ',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-with-no-cars-low-poly-i_ikyidk.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'PHÚC XÁ, BA ĐÌNH, HN',
        lat: 21.044907, 
        lng: 105.850305,
      },
    },
  },
  {
    displayName: 'NGỌC THUỴ Garage 7',
    description: 'Parking near NGỌC THUỴ',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-outer-space-vanishing-point-super-highway-high-speed-_wnpn6u.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
        ...generateSlots({
          type: 'CAR',
        }),
      ],
    },
    Address: {
      create: {
        address: 'NGỌC THUỴ, LONG BIÊN, HN',
        lat: 21.064171, 
        lng: 105.846840,
      },
    },
  },
  {
    displayName: 'CHƯƠNG DƯƠNG Garage 7',
    description: 'Parking in CHƯƠNG DƯƠNG',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette_buv6ks.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BIKE',
        }),
      ],
    },
    Address: {
      create: {
        address: 'CHƯƠNG DƯƠNG, HOÀN KIẾM, HN',
        lat: 21.021194, 
        lng: 105.862863,
      },
    },
  },
  {
    displayName: 'Ngọc Lâm Garage 7',
    description: 'Parking in Ngọc Lâm',
    Company: { connect: { id: 1 } },
    images: {
      set: [
        'https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/multistorey-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art-3d-art-hig_1_pbgzgi.jpg',
      ],
    },
    Slots: {
      create: [
        ...generateSlots({
          type: 'BICYCLE',
        }),

        ...generateSlots({
          type: 'CAR',
        }),
        ...generateSlots({
          type: 'HEAVY',
        }),
      ],
    },
    Address: {
      create: {
        address: 'Ngọc Lâm, Long Biên, Hà Nội',
        lat: 21.043291, 
        lng: 105.873689,
      },
    },
  },
]
