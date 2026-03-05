import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('locales')
        .select('*')
        .order('numero')

      if (error) throw error

      res.status(200).json({ success: true, data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (method === 'POST') {
    const { numero, metros_cuadrados, estatus, renta, mantenimiento_mensual } = req.body

    if (!numero || !metros_cuadrados) {
      return res.status(400).json({ error: 'Número y metros cuadrados son requeridos' })
    }

    try {
      const { data, error } = await supabase
        .from('locales')
        .insert([{
          numero: Number(numero),
          metros_cuadrados: Number(metros_cuadrados),
          estatus,
          renta: Number(renta) || 0,
          mantenimiento_mensual: Number(mantenimiento_mensual) || 0
        }])
        .select()
        .single()

      if (error) throw error

      res.status(200).json({ success: true, data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (method === 'PUT') {
    const { id, numero, metros_cuadrados, estatus, renta, mantenimiento_mensual } = req.body

    if (!id || !numero || !metros_cuadrados) {
      return res.status(400).json({ error: 'ID, número y metros cuadrados son requeridos' })
    }

    try {
      const { data, error } = await supabase
        .from('locales')
        .update({
          numero: Number(numero),
          metros_cuadrados: Number(metros_cuadrados),
          estatus,
          renta: Number(renta) || 0,
          mantenimiento_mensual: Number(mantenimiento_mensual) || 0
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      res.status(200).json({ success: true, data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}