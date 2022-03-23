import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// import mongoose from 'mongoose';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || '';
  const checkMongoIDRegExp = /^[0-9a-fA-F]{24}$/;

  // si el id recibido no cumple con la expresion regular
  if (!checkMongoIDRegExp.test(id)) {
    return new Response(
      JSON.stringify({ message: 'El id de la entrada no es válido.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // forma correcta para validar un id de mongo pero por el momento esta dando problemas
  // if (!mongoose.isValidObjectId(id))
  //   return new Response(
  //     JSON.stringify({ message: 'El id de la entrada no es válido.' }),
  //     {
  //       status: 400,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

  return NextResponse.next();
}
