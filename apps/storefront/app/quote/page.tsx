'use client'

import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button, Badge, Card, Input, Textarea, useLanguage } from '@bezier-lab/ui'
import { Mail, Phone, Clock, MapPin, UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react'

export default function OrderPage() {
  const { language } = useLanguage()
  const isPt = language === 'pt'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: '', email: '', company: '', message: '' })
      setFile(null)
    }, 1200)
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-24 overflow-hidden bg-canvas">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--color-accent-glow)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16">
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="accent" className="mb-4">
              {isPt ? 'Orçamento / Pedido' : 'Quote / Order'}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gradient-cyan">
                {isPt ? 'Inicie seu Projeto' : 'Start Your Project'}
              </span>
            </h1>
            <p className="text-lg text-ink-subtle leading-relaxed">
              {isPt
                ? 'Envie seus arquivos CAD ou detalhes do projeto para receber uma cotação comercial e análise de engenharia em até 24 horas.'
                : 'Send your CAD files or project details to receive a commercial quote and engineering analysis within 24 hours.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-4 space-y-6">
              <div className="surface-card p-6 flex flex-col gap-6">
                <h3 className="text-lg font-bold text-ink mb-2">
                  {isPt ? 'Canais de Atendimento' : 'Contact Channels'}
                </h3>
                
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{isPt ? 'E-mail Técnico' : 'Technical Email'}</h4>
                    <p className="text-xs text-ink-muted mt-1 font-mono">contact@bezierlab.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4.5 w-4.5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{isPt ? 'Telefone / WhatsApp' : 'Phone / WhatsApp'}</h4>
                    <p className="text-xs text-ink-muted mt-1 font-mono">+55 (11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4.5 w-4.5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{isPt ? 'Horário Comercial' : 'Business Hours'}</h4>
                    <p className="text-xs text-ink-muted mt-1">
                      {isPt ? 'Segunda a Sexta: 08:00 às 18:00' : 'Monday to Friday: 8:00 AM to 6:00 PM'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4.5 w-4.5 text-warning" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{isPt ? 'Localização' : 'Location'}</h4>
                    <p className="text-xs text-ink-muted mt-1">
                      {isPt ? 'São Paulo, SP — Brasil' : 'São Paulo, SP — Brazil'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-8">
              <div className="surface-card p-8 relative overflow-hidden">
                {success ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <CheckCircle2 className="h-16 w-16 text-success mb-6 animate-bounce" />
                    <h2 className="text-2xl font-bold text-ink mb-4">
                      {isPt ? 'Orçamento Solicitado!' : 'Quote Requested!'}
                    </h2>
                    <p className="text-base text-ink-subtle max-w-md mx-auto mb-8">
                      {isPt
                        ? 'Obrigado por enviar seu projeto. Nossa equipe de engenharia já está revisando seus arquivos e retornará em até 24 horas úteis.'
                        : 'Thank you for submitting your project. Our engineering team is already reviewing your files and will get back to you within 24 business hours.'}
                    </p>
                    <Button variant="outline" onClick={() => setSuccess(false)}>
                      {isPt ? 'Enviar Outro Arquivo' : 'Send Another File'}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="contact-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        id="contact-name"
                        label={isPt ? 'Seu Nome' : 'Your Name'}
                        placeholder={isPt ? 'Ex: Cassiano Silva' : 'e.g. John Doe'}
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        id="contact-email"
                        label={isPt ? 'E-mail Corporativo' : 'Corporate Email'}
                        type="email"
                        placeholder="cassiano@empresa.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <Input
                      id="contact-company"
                      label={isPt ? 'Empresa' : 'Company Name'}
                      placeholder="Bézier Lab Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />

                    {/* Drag and Drop zone for 3D files */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-ink leading-none">
                        {isPt ? 'Enviar Modelo 3D (CAD)' : 'Upload 3D Model (CAD)'}
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('cad-upload')?.click()}
                        className="border-2 border-dashed border-border hover:border-accent/50 rounded-xl p-8 text-center cursor-pointer transition-colors bg-canvas-deep flex flex-col items-center justify-center gap-3 relative"
                      >
                        <input
                          id="cad-upload"
                          type="file"
                          accept=".stl,.step,.stp,.igs,.iges,.obj"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <UploadCloud className="h-10 w-10 text-ink-muted" />
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {file ? file.name : (isPt ? 'Arraste seu arquivo 3D aqui' : 'Drag & drop your 3D file here')}
                          </p>
                          <p className="text-xs text-ink-disabled mt-1">
                            {isPt ? 'Aceitamos .STL, .STEP, .IGES, .OBJ (Max 50MB)' : 'We accept .STL, .STEP, .IGES, .OBJ (Max 50MB)'}
                          </p>
                        </div>
                        {file && (
                          <div className="mt-2 text-xs text-success font-semibold flex items-center gap-1.5 justify-center">
                            <CheckCircle2 className="h-4 w-4" />
                            {isPt ? 'Arquivo selecionado com sucesso' : 'File selected successfully'}
                          </div>
                        )}
                      </div>
                    </div>

                    <Textarea
                      id="contact-message"
                      label={isPt ? 'Detalhamento do Projeto' : 'Project Description'}
                      placeholder={isPt ? 'Descreva o uso da peça, quantidade, material desejado e prazos...' : 'Describe usage, quantity, preferred material, and deadline...'}
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <Button
                      id="contact-submit"
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      className="w-full mt-2"
                    >
                      {isPt ? 'Enviar Solicitação de Orçamento' : 'Send Quote Request'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
