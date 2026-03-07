import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Traemos los pagos junto con info del contrato y local para que el reporte sea útil
        const { data: getData, error: getError } = await supabase
          .from('pagos')
          .select('*, contratos(inquilino_id), locales(numero)');
        if (getError) throw getError;
        return res.status(200).json({ success: true, data: getData });

      case 'POST':
        // Lógica de eliminación (siguiendo tu estándar)
        if (req.body.action === 'delete') {
          const { error: delError } = await supabase
            .from('pagos')
            .delete()
            .eq('id', req.body.id);
          if (delError) throw delError;
          return res.status(200).json({ success: true, message: "Pago eliminado" });
        }
        
        // Creación: Calculamos la diferencia automáticamente
        const nuevoPago = { ...req.body };
        nuevoPago.diferencia = nuevoPago.monto_esperado - nuevoPago.monto_pagado;

        const { data: postData, error: postError } = await supabase
          .from('pagos')
          .insert([nuevoPago])
          .select();
        if (postError) throw postError;
        return res.status(201).json({ success: true, data: postData });

      case 'PUT':
        // Actualización: Recalculamos diferencia si se modifican montos
        const { id, ...updateData } = req.body;
        if (updateData.monto_esperado !== undefined || updateData.monto_pagado !== undefined) {
            updateData.diferencia = (updateData.monto_esperado || 0) - (updateData.monto_pagado || 0);
        }

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