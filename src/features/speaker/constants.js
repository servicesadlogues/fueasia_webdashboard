export const SPEAKER_EVENT_NAME = 'FUE ASIA CONGRESS 2027 Chennai'

export const SPEAKER_BANNER_HEADLINE = 'FUE GLOBAL Conference'
export const SPEAKER_BANNER_SUBTITLE = 'Speaker Submission Portal'
export const SPEAKER_BANNER_EVENT_LINE = 'FUE ASIA Congress 2027, Chennai'

export const AGREEMENT_SCIENTIFIC_TEXT =
  'I confirm that my presentation is scientific/non-commercial and complies with Indian Medical Council rules.'

export const SPEAKER_DOC_FIELDS = [
  {
    key: 'photo',
    label: 'Recent Photograph',
    uploadLabel: 'Upload Photo',
    accept: '.jpg,.jpeg,.png',
    imageOnly: true,
    portrait: true,
  },
  {
    key: 'passport',
    label: 'Passport',
    uploadLabel: 'Upload Passport',
    accept: '.pdf,.jpg,.jpeg,.png',
    imageOnly: false,
    portrait: false,
  },
  {
    key: 'cv',
    label: 'CV',
    uploadLabel: 'Upload CV',
    accept: '.pdf,.jpg,.jpeg,.png',
    imageOnly: false,
    portrait: false,
  },
]

export const REQUIRED_SPEAKER_DOCS = SPEAKER_DOC_FIELDS.map((field) => field.key)
