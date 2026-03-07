import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const { data: getData, error: getError } = await supabase
          .from('pagos')
          .select('*, contratos(inquilino_id), locales(numero)');
        if (getError) throw getError;
        return res.status(200).json({ success: true, data: getData });

      case 'POST':
        if (req.body.action === 'delete') {
          const { error: delError } = await supabase
            .from('pagos')
            .delete()
            .eq('id', req.body.id);
          if (delError) throw delError;
          return res.status(200).json({ success: true, message: "Pago eliminado" });
        }
        
        // Limpiamos los campos que la base de datos genera automáticamente
        const datosParaInsertar = { ...req.body };
        delete datosParaInsertar.diferencia;
        delete datosParaInsertar.estado; // Eliminamos 'estado' para que lo asigne la DB

        const { data: postData, error: postError } = await supabase
          .from('pagos')
          .insert([datosParaInsertar])
          .select();
        
        if (postError) throw postError;
        return res.status(201).json({ success: true, data: postData });

      case 'PUT':
        const { id, ...updateData } = req.body;
        
        // Evitamos enviar campos generados en la actualización
        delete updateData.diferencia;
        // Solo enviamos el estado en el PUT si realmente necesitas cambiarlo manualmente después
        // Si también es generado en el UPDATE, podrías necesitar borrarlo aquí también.

        const { data: putData, error: putError } = await supabase
          .from('pagos')
          .update(updateData)
          .eq('id', id)
          .select();
        
        if (putError) throw putError;
        return res.status(200).json({ success: true, data: putData });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}